import { beforeEach, afterEach, expect, it, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import SimpleForm from './SimpleForm.jsx'
import { simulation } from '../data/simulation.js'

const dossier = simulation.dossiers[0]
const evidence = simulation.evidence.filter((item) => item.dossierID === dossier.dossierID)
const end = Date.parse(dossier.appealDeadline)
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(end - 10000) })
afterEach(() => { cleanup(); vi.useRealTimers() })

it('uses a nonannouncing accessible timer and disables the action on expiry', async () => {
  await act(async () => { render(<SimpleForm dossier={dossier} evidence={evidence} />) })
  expect(screen.getByRole('timer')).toHaveAttribute('aria-live', 'off')
  expect(screen.getByRole('timer')).toHaveTextContent('00d 00:00:10')
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled()
  vi.setSystemTime(end)
  fireEvent(document, new Event('visibilitychange'))
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
  expect(screen.getByText(/Deadline expired/)).toBeVisible()
})
it('fails closed for an invalid deadline', async () => {
  await act(async () => { render(<SimpleForm dossier={{ ...dossier, appealDeadline: 'broken' }} evidence={evidence} />) })
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
  expect(screen.getByText(/Deadline unavailable/)).toBeVisible()
})
it('rejects a late submission even when the displayed clock has not ticked', async () => {
  await act(async () => { render(<SimpleForm dossier={dossier} evidence={evidence} />) })
  fireEvent.change(screen.getByLabelText('Applicant name'), { target: { value: 'Demo Applicant' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } })
  fireEvent.change(screen.getByLabelText('Appeal reasons'), { target: { value: 'Please review the fictional briefing context and demonstration record.' } })
  fireEvent.click(screen.getByLabelText('I understand this is a local simulation.'))
  vi.setSystemTime(end + 1)
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled()
  fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
  expect(screen.queryByText(/Persisted appeal status/)).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeDisabled()
  expect(screen.getByText(/Deadline expired/)).toBeVisible()
})
