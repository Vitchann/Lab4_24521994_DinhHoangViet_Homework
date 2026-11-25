// Optional local Chromium QA using Node 24's WebSocket; no browser package needed.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const url = process.env.PREVIEW_URL || 'http://127.0.0.1:5173'
const binary = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const output = path.resolve('../verification')
const prefix = process.env.REPORT_PREFIX || 'P2-16'
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
  const diagnostics = { consoleErrors: [], exceptions: [], networkFailures: [], httpErrors: [] }
  const pending = new Map()
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') diagnostics.consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description))
    if (message.method === 'Runtime.exceptionThrown') diagnostics.exceptions.push(message.params.exceptionDetails.text)
    if (message.method === 'Network.loadingFailed') diagnostics.networkFailures.push(message.params.errorText)
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) diagnostics.httpErrors.push({ url: message.params.response.url, status: message.params.response.status })
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
  await send('Runtime.enable')
  await send('Network.enable')
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
    await writeFile(path.join(output, `${prefix}-${width}.png`), Buffer.from(screenshot.data, 'base64'))
    viewports.push(result)
  }
  const key = async (key, code, windowsVirtualKeyCode) => {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode })
  }
  await key('Tab', 'Tab', 9)
  assert.equal(await evaluate('document.activeElement.classList.contains("skip-link")'), true, 'First Tab reaches skip link')
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  const reducedMotion = await evaluate(`({ animation: getComputedStyle(document.querySelector('.card-entry')).animationName, transition: getComputedStyle(document.querySelector('.card-stack')).transitionDuration })`)
  assert.equal(reducedMotion.animation, 'none')
  assert.equal(reducedMotion.transition, '0s')
  await send('Emulation.setEmulatedMedia', { features: [] })
  const contrast = await evaluate(`(() => {
    const rgb = text => text.match(/[\\d.]+/g).map(Number);
    const mix = (fg,bg) => fg.slice(0,3).map((c,i) => c * (fg[3] ?? 1) + bg[i] * (1 - (fg[3] ?? 1)));
    const luminance = c => c.map(v => { const s=v/255; return s<=.04045?s/12.92:((s+.055)/1.055)**2.4 }).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
    return ['.header-note','.site-footer','.history-note','.little-note p','.count-badge','.profile-bio','.interest-tags li','.action-button > span','.keyboard-help','.profile-meta'].map(selector => {
      const element=document.querySelector(selector); const chain=[]; for(let e=element;e;e=e.parentElement) chain.unshift(e);
      const bg=chain.reduce((color,e)=>mix(rgb(getComputedStyle(e).backgroundColor),color),[255,255,255]);
      const fg=mix(rgb(getComputedStyle(element).color),bg); const a=luminance(fg),b=luminance(bg);
      return {selector,ratio:Number(((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2))};
    });
  })()`)
  for (const sample of contrast) assert.ok(sample.ratio >= 4.5, `Text contrast ${sample.selector}: ${sample.ratio}`)
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
  for (const [category, errors] of Object.entries(diagnostics)) assert.equal(errors.length, 0, `${category}: ${JSON.stringify(errors)}`)
  const report = { url, viewports, focus, reducedMotion, contrast, diagnostics, nativeKeyboard: 'passed', nativeMouse: 'passed', emulatedTouch: 'passed', undo: 'passed', qaNoSandbox: process.env.QA_NO_SANDBOX === '1', note: 'Headless Chrome/CDP; sampled text contrast only, not a WCAG audit. Physical touchscreen and screen-reader checks not performed.' }
  await writeFile(path.join(output, `${prefix}-BROWSER.json`), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  if (socket?.readyState === WebSocket.OPEN) await closeBrowser?.().catch(() => {})
  socket?.close()
  browser.kill()
  // The isolated temporary browser profile is intentionally left to OS temp cleanup.
}
