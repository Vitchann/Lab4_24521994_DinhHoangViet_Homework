import { render, screen, fireEvent, waitFor, cleanup, act, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import AppRoutes from './AppRoutes.jsx'
import { createApiMock, jsonResponse, persistedAppeal } from '../test/apiMock.js'
import { simulation } from '../data/simulation.js'

const visit = (path = '/') => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>)
beforeEach(() => vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-26T12:00:00.000Z')))
afterEach(() => vi.restoreAllMocks())
function fillValid() {
  fireEvent.change(screen.getByLabelText('Applicant name'), { target: { value: 'Demo Applicant' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } })
  fireEvent.change(screen.getByLabelText('Appeal reasons'), { target: { value: 'Please review the fictional briefing context and demonstration record.' } })
  fireEvent.click(screen.getByLabelText('I understand this is a local simulation.'))
}
it('shows loading and retries a network failure without falling back to bundled fixtures', async () => {
  vi.mocked(fetch).mockRejectedValueOnce(new TypeError('offline'))
  visit()
  expect(screen.getByText(/Loading dossiers/)).toBeVisible()
  expect(await screen.findByRole('alert')).toHaveTextContent(/Unable to load/)
  expect(screen.queryByText('Training protocol review')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
  expect(await screen.findByRole('heading', { name: 'Fair play starts with a fair review.' })).toBeVisible()
  expect(screen.getByRole('table')).toHaveTextContent('20')
})
it('handles a valid empty API snapshot', async () => {
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ data: { notice: simulation.notice, players: [], dossiers: [], evidence: [], sanctions: [] } }))
  visit()
  expect(await screen.findByRole('heading', { name: 'No simulation dossiers' })).toBeVisible()
})
it('aborts a pending data request on unmount', async () => {
  vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
  const { unmount } = visit()
  await waitFor(() => expect(fetch).toHaveBeenCalled())
  const signal = vi.mocked(fetch).mock.calls[0][1].signal
  unmount()
  expect(signal.aborted).toBe(true)
})
it('submits once during concurrent events and restores persisted status on remount', async () => {
  const handler = createApiMock()
  let resolvePost
  vi.mocked(fetch).mockImplementation((url, options) => options?.method === 'POST' ? new Promise((resolve) => { resolvePost = () => handler(url, options).then(resolve) }) : handler(url, options))
  visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  const button = await screen.findByRole('button', { name: 'Submit simulation appeal' })
  await waitFor(() => expect(button).toBeEnabled())
  fillValid()
  const form = screen.getByRole('form', { name: 'Demo appeal form' })
  fireEvent.submit(form); fireEvent.submit(form)
  expect(vi.mocked(fetch).mock.calls.filter(([, options]) => options?.method === 'POST')).toHaveLength(1)
  expect(button).toBeDisabled()
  resolvePost()
  expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  cleanup()
  visit('/dossier/sim-himass')
  expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  expect(screen.getByText(persistedAppeal.id)).toBeVisible()
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
})
it('recovers an ambiguous lost POST response by reading persisted status without a second POST', async () => {
  const handler = createApiMock()
  vi.mocked(fetch).mockImplementation(async (url, options) => {
    const result = await handler(url, options)
    if (options?.method === 'POST') throw new TypeError('Response lost after commit')
    return result
  })
  visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
  fillValid(); fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  expect(vi.mocked(fetch).mock.calls.filter(([, options]) => options?.method === 'POST')).toHaveLength(1)
})
it('rejects an invalid dataset response without showing fictional success data', async () => {
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ data: {} }))
  visit()
  expect(await screen.findByRole('alert')).toHaveTextContent('API response was invalid')
  expect(screen.queryByRole('table')).not.toBeInTheDocument()
})
it('derives the matrix from changed API data instead of the seed module', async () => {
  const changed = structuredClone(simulation)
  changed.sanctions[0].durationDays = 14
  changed.sanctions[0].effectiveUntil = '2026-12-06T12:00:00.000Z'
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ data: changed }))
  visit()
  const table = await screen.findByRole('table')
  const row = within(table).getByRole('rowheader', { name: 'Player Alpha' }).closest('tr')
  expect(within(row).getByRole('cell', { name: '90' })).toBeVisible()
})
it('retains server deadline rejection even when the client countdown is active', async () => {
  const handler = createApiMock()
  vi.mocked(fetch).mockImplementation((url, options) => options?.method === 'POST' ? Promise.resolve(jsonResponse({ error: { code: 'DEADLINE_EXPIRED', message: 'Server deadline expired.' } }, 410)) : handler(url, options))
  visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
  fillValid(); fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(await screen.findByText(/Server deadline expired/)).toBeVisible()
  await waitFor(() => expect(screen.queryByText(/Loading appeal status/)).not.toBeInTheDocument())
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
  expect(screen.queryByText(/Persisted appeal status/)).not.toBeInTheDocument()
})
it('shows server field feedback then clears it synchronously on editing', async () => {
  const handler = createApiMock()
  vi.mocked(fetch).mockImplementation((url, options) => options?.method === 'POST' ? Promise.resolve(jsonResponse({ error: { code: 'VALIDATION_FAILED', message: 'Server validation rejected.', fields: { grounds: 'Server requires clarification.' } } }, 422)) : handler(url, options))
  visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
  fillValid(); fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(await screen.findByText('Server requires clarification.')).toBeVisible()
  expect(screen.getByLabelText('Appeal reasons')).toHaveAttribute('aria-invalid', 'true')
  fireEvent.change(screen.getByLabelText('Appeal reasons'), { target: { value: 'Updated fictional context with additional clarification for review.' } })
  expect(screen.getByLabelText('Appeal reasons')).toHaveAttribute('aria-invalid', 'false')
})
it('restores another client submission after a 409 without sending again', async () => {
  const handler = createApiMock()
  vi.mocked(fetch).mockImplementation(async (url, options) => {
    const result = await handler(url, options)
    return options?.method === 'POST' ? jsonResponse({ error: { code: 'DUPLICATE_APPEAL', message: 'Another client already submitted.' } }, 409) : result
  })
  visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
  fillValid(); fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  expect(vi.mocked(fetch).mock.calls.filter(([, options]) => options?.method === 'POST')).toHaveLength(1)
})
it('aborts an in-flight POST on unmount', async () => {
  const handler = createApiMock()
  let signal
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (options?.method === 'POST') { signal = options.signal; return new Promise(() => {}) }
    return handler(url, options)
  })
  const { unmount } = visit('/dossier/sim-himass')
  await screen.findByLabelText('Applicant name')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
  fillValid(); fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(signal.aborted).toBe(false)
  unmount(); expect(signal.aborted).toBe(true)
})
it('does not let an obsolete case request overwrite a newly selected player', async () => {
  const handler = createApiMock()
  let resolveAlpha, alphaSignal
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (String(url).endsWith('/dossiers/sim-himass')) {
      alphaSignal = options.signal
      return new Promise((resolve) => { resolveAlpha = async () => resolve(await handler(url, options)) })
    }
    return handler(url, options)
  })
  visit('/dossier/sim-himass')
  fireEvent.click(screen.getByRole('link', { name: 'Dossier registry' }))
  fireEvent.click(await screen.findByRole('link', { name: 'Open dossier for Player Beta' }))
  expect(await screen.findByRole('heading', { name: 'Player Beta' })).toBeVisible()
  expect(alphaSignal.aborted).toBe(true)
  await act(async () => resolveAlpha())
  expect(screen.getByRole('heading', { name: 'Player Beta' })).toBeVisible()
  expect(screen.queryByRole('heading', { name: 'Player Alpha' })).not.toBeInTheDocument()
})
it('rejects a persisted status belonging to a different dossier', async () => {
  const handler = createApiMock()
  vi.mocked(fetch).mockImplementation((url, options) => String(url).endsWith('/appeal') ? Promise.resolve(jsonResponse({ data: { ...persistedAppeal, dossierID: 'wrong-case' } })) : handler(url, options))
  visit('/dossier/sim-himass')
  expect(await screen.findByText(/Unable to load appeal status/)).toBeVisible()
  expect(screen.queryByText(/Persisted appeal status/)).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
})
