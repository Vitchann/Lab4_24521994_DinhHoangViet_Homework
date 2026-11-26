import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
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
