import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4174'
const output = path.resolve('verification')
const prefix = process.env.QA_REPORT_PREFIX || 'P3-10'
assert.match(prefix, /^P3-\d{2}$/)
await mkdir(output, { recursive: true })
const profile = await mkdtemp(path.join(tmpdir(), 'hw3-browser-'))
const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', ...(process.env.QA_NO_SANDBOX === '1' ? ['--no-sandbox'] : []), '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' })
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let socket, closeBrowser, launchError
browser.on('error', (error) => { launchError = error })
try {
  let port, target
  for (let attempt = 0; attempt < 100; attempt++) {
    if (launchError) throw launchError
    try { [port, target] = (await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).trim().split('\n'); break } catch { await delay(100) }
  }
  assert.ok(port, 'Browser must expose its isolated debug endpoint')
  socket = new WebSocket(`ws://127.0.0.1:${port}${target}`)
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }) })
  const pending = new Map()
  const errors = { console: [], exceptions: [], network: [], http: [] }
  let id = 0, sessionId
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.console.push(message.params.args.map((arg) => arg.value ?? arg.description))
    if (message.method === 'Runtime.exceptionThrown') errors.exceptions.push(message.params.exceptionDetails.text)
    if (message.method === 'Network.loadingFailed') errors.network.push(message.params.errorText)
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.http.push(message.params.response.url)
    const request = pending.get(message.id)
    if (request) {
      pending.delete(message.id)
      clearTimeout(request.timer)
      if (message.error) request.reject(new Error(JSON.stringify(message.error)))
      else request.resolve(message.result)
    }
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timeout: ${method}`)) }, 15000)
    pending.set(requestId, { resolve, reject, timer })
    socket.send(JSON.stringify({ id: requestId, method, params, ...(sessionId && !method.startsWith('Browser.') && !method.startsWith('Target.') ? { sessionId } : {}) }))
  })
  closeBrowser = () => send('Browser.close')
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  const version = await send('Browser.getVersion')
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  ;({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }))
  for (const domain of ['Page', 'Runtime', 'Network']) await send(`${domain}.enable`)
  const waitHeading = async (heading) => {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate(`document.querySelector('h1')?.textContent === ${JSON.stringify(heading)}`)) return
      await delay(50)
    }
    throw new Error(`Expected heading: ${heading}`)
  }
  const navigate = async (route, heading) => {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, 'SPA fallback should serve index for direct routes')
    assert.match(await response.text(), /<div id="root"><\/div>/)
    await send('Page.navigate', { url: base + route })
    await waitHeading(heading)
    assert.equal(await evaluate(`Boolean(document.querySelector('[role="note"][aria-label="Simulation notice"]'))`), true)
  }
  const routes = [
    ['/', 'Fair play starts with a fair review.'], ['/dossiers', 'Case dossiers'],
    ['/dossier/sim-himass', 'Player Alpha'], ['/dossier/sim-tanvuu', 'Player Beta'],
    ['/dossier/unknown', 'Dossier not found'], ['/dossier/toString', 'Dossier not found'],
    ['/dossier', 'Page not found'], ['/missing', 'Page not found'], ['/about', 'About this simulation'],
  ]
  for (const [route, heading] of routes) await navigate(route, heading)
  const viewports = []
  for (const width of [320, 375, 768, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false })
    for (const [route, heading, label] of [['/', 'Fair play starts with a fair review.', 'overview'], ['/dossier/sim-himass', 'Player Alpha', 'dossier']]) {
      await navigate(route, heading)
      await delay(120)
      const metrics = await evaluate('({width:innerWidth,client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,main:document.querySelectorAll("main").length})')
      assert.equal(metrics.scroll, metrics.client, `No overflow ${label} at ${width}`)
      assert.equal(metrics.main, 1)
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
      await writeFile(path.join(output, `${prefix}-${label}-${width}.png`), Buffer.from(shot.data, 'base64'))
      viewports.push({ route, ...metrics })
    }
  }
  await navigate('/dossiers', 'Case dossiers')
  await evaluate(`window.__qaNavigationToken="kept"; document.querySelector('a[aria-label="Open dossier for Player Beta"]').focus()`)
  assert.equal(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'solid')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await waitHeading('Player Beta')
  assert.equal(await evaluate('window.__qaNavigationToken'), 'kept', 'Internal route navigation must not reload')
  await send('Page.reload', { ignoreCache: true })
  await waitHeading('Player Beta')
  assert.equal(await evaluate('location.pathname'), '/dossier/sim-tanvuu')
  // Exercise native typing against the production React form, not synthetic state setters.
  await evaluate(`document.querySelector('button[type="submit"]').click()`)
  assert.equal(await evaluate(`Boolean(document.querySelector('[role="alert"]'))`), true)
  for (const [name, text] of [['applicantName', 'Browser Demo'], ['applicantEmail', 'browser@example.test'], ['grounds', 'Please review this fictional dossier and the demonstration briefing context.']]) {
    await evaluate(`document.querySelector('[name="${name}"]').focus()`)
    assert.equal(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'solid')
    await send('Input.insertText', { text })
  }
  await evaluate(`document.querySelector('[name="acknowledged"]').click(); document.querySelector('button[type="submit"]').click()`)
  assert.match(await evaluate(`document.querySelector('[role="status"]')?.textContent`), /Local review generated/)
  assert.equal(await evaluate(`document.querySelector('[role="timer"]').getAttribute('aria-live')`), 'off')
  const localReview = 'passed native typing, validation, focus and local-only receipt'
  // A stale displayed countdown must never authorize a late review.
  await evaluate(`Date.now = () => Date.parse('2026-12-07T00:00:00.000Z'); document.querySelector('form').requestSubmit()`)
  assert.equal(await evaluate(`document.querySelector('button[type="submit"]').disabled`), true)
  assert.equal(await evaluate(`Boolean(document.querySelector('[role="status"]'))`), false)
  assert.match(await evaluate(`document.querySelector('.sla-panel').textContent`), /Deadline expired/)
  const expiryGuard = 'passed stale-clock submission rejection'
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  const reducedMotion = await evaluate('({animation:getComputedStyle(document.querySelector("main")).animationName,transition:getComputedStyle(document.querySelector("main")).transitionDuration})')
  assert.equal(reducedMotion.animation, 'none')
  assert.equal(reducedMotion.transition, '0s')
  for (const [kind, list] of Object.entries(errors)) assert.equal(list.length, 0, `${kind}: ${JSON.stringify(list)}`)
  const report = { browser: version.product, base, routes: routes.map(([route, heading]) => ({ route, heading, directAccess: 'passed' })), viewports, keyboardNavigation: 'passed without document reload', deepLinkReload: 'passed for Player Beta', localReview, expiryGuard, reducedMotion, errors, qaNoSandbox: process.env.QA_NO_SANDBOX === '1', limitations: 'Headless Chrome only; no physical-device/screen-reader/Lighthouse/full WCAG or database verification. SPA unknown routes intentionally receive HTTP 200 index fallback and show a client 404 view.' }
  await writeFile(path.join(output, `${prefix}-BROWSER.json`), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  if (socket?.readyState === WebSocket.OPEN) await closeBrowser?.().catch(() => {})
  socket?.close()
  browser.kill()
}
