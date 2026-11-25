// Optional local Chromium QA using Node 24's WebSocket; no browser package needed.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const url = process.env.PREVIEW_URL || 'http://127.0.0.1:5173'
const binary = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const output = path.resolve('../verification')
await mkdir(output, { recursive: true })
assert.equal((await fetch(url)).status, 200, 'Preview must serve HTTP 200')
const profile = await mkdtemp(path.join(tmpdir(), 'henho-browser-'))
const browser = spawn(binary, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', ...(process.env.QA_NO_SANDBOX === '1' ? ['--no-sandbox'] : []), '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' })
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let launchError
browser.on('error', (error) => { launchError = error })
let socket
let closeBrowser
try {
  let port, browserTarget
  for (let attempt = 0; attempt < 100; attempt++) {
    if (launchError) throw launchError
    try { [port, browserTarget] = (await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).trim().split('\n'); break } catch { await delay(100) }
  }
  assert.ok(port, 'Chrome debugging endpoint must become ready')
  socket = new WebSocket(`ws://127.0.0.1:${port}${browserTarget}`)
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }) })
  let id = 0
  const pending = new Map()
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    const request = pending.get(message.id)
    if (request) {
      pending.delete(message.id)
      clearTimeout(request.timer)
      if (message.error) request.reject(new Error(JSON.stringify(message.error)))
      else request.resolve(message.result)
    }
  })
  let sessionId
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timeout: ${method}`)) }, 20000)
    pending.set(requestId, { resolve, reject, timer })
    socket.send(JSON.stringify({ id: requestId, method, params, ...(!method.startsWith('Browser.') && !method.startsWith('Target.') && sessionId ? { sessionId } : {}) }))
  })
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  closeBrowser = () => send('Browser.close')
  console.log('Connected to Chrome browser; creating an isolated page target.')
  console.log(await send('Browser.getVersion'))
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  ;({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }))
  await send('Page.enable')
  await send('Page.navigate', { url })
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('Boolean(document.querySelector(".profile-card"))')) break
    await delay(100)
  }
  const viewports = []
  for (const width of [375, 768, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false })
    await delay(300)
    const result = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, imagesLoaded: [...document.querySelectorAll('img')].every(img => img.complete && img.naturalWidth > 0), card: document.querySelector('.profile-heading h2')?.textContent, columns: getComputedStyle(document.querySelector('.deck-layout')).gridTemplateColumns })`)
    assert.equal(result.scrollWidth, result.clientWidth, `No horizontal overflow at ${width}px`)
    assert.equal(result.imagesLoaded, true, 'Local profile images must load')
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    await writeFile(path.join(output, `P2-08-${width}.png`), Buffer.from(screenshot.data, 'base64'))
    viewports.push(result)
  }
  const key = async (key, code, windowsVirtualKeyCode) => {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode })
  }
  await evaluate('document.querySelector(".deck-layout").focus()')
  const focus = await evaluate('getComputedStyle(document.activeElement).outlineStyle')
  assert.equal(focus, 'solid', 'Keyboard focus must be visible')
  await key('ArrowRight', 'ArrowRight', 39)
  assert.equal(await evaluate('document.querySelector(".score-value").textContent'), '+10')
  // Native mouse drag, not a synthetic DOM event.
  const origin = await evaluate(`(() => { const r = document.querySelector('.card-stack').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+160} })()`)
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...origin, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: origin.x - 80, y: origin.y, button: 'left', buttons: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: origin.x - 80, y: origin.y, button: 'left', clickCount: 1 })
  assert.equal(await evaluate('document.querySelector(".score-value").textContent'), '+5')
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 1000, deviceScaleFactor: 1, mobile: true })
  await send('Emulation.setTouchEmulationEnabled', { enabled: true })
  await evaluate('document.querySelector(".card-stack").scrollIntoView({block:"center"})')
  await delay(300)
  const touch = await evaluate(`(() => { const r = document.querySelector('.card-stack').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+180} })()`)
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...touch, id: 1 }] })
  await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touch.x, y: touch.y - 80, id: 1 }] })
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  assert.equal(await evaluate('document.querySelector(".score-value").textContent'), '0')
  assert.equal(await evaluate('document.querySelectorAll(".history-list li").length'), 3)
  await key('Backspace', 'Backspace', 8)
  assert.equal(await evaluate('document.querySelector(".score-value").textContent'), '+5')
  const report = { viewports, focus, nativeKeyboard: 'passed', nativeMouse: 'passed', emulatedTouch: 'passed', undo: 'passed', qaNoSandbox: process.env.QA_NO_SANDBOX === '1', note: 'Headless Chrome/CDP; real physical touchscreen and screen-reader checks not performed.' }
  await writeFile(path.join(output, 'P2-08-BROWSER.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  if (socket?.readyState === WebSocket.OPEN) await closeBrowser?.().catch(() => {})
  socket?.close()
  browser.kill()
  // The isolated temporary browser profile is intentionally left to OS temp cleanup.
}
