import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimpleForm from './SimpleForm.jsx'
import { simulation } from '../data/simulation.js'

const dossier = simulation.dossiers[0]
const evidence = simulation.evidence.filter((item) => item.dossierID === dossier.dossierID)
beforeEach(() => vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-26T00:00:00.000Z')))
afterEach(() => vi.restoreAllMocks())

function fillValid() {
  fireEvent.change(screen.getByLabelText('Applicant name'), { target: { value: 'Demo Applicant' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } })
  fireEvent.change(screen.getByLabelText('Appeal reasons'), { target: { value: 'Please review the fictional briefing context and demonstration record.' } })
  fireEvent.click(screen.getByLabelText('I understand this is a local simulation.'))
}
describe('Context appeal form', () => {
  it('shares live values with ShowData and confirms an immutable persisted submission', async () => {
    render(<SimpleForm dossier={dossier} evidence={evidence} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
    fillValid()
    expect(within(screen.getByRole('region', { name: 'Appeal data review' })).getByText('Demo Applicant')).toBeVisible()
    fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
    expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
    await userEvent.type(screen.getByLabelText('Applicant name'), ' revised')
    expect(screen.getByLabelText('Applicant name')).toHaveValue('Demo Applicant')
    expect(screen.getByLabelText('Applicant name')).toBeDisabled()
    expect(screen.getByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  })
  it('prevents invalid review and connects field errors to accessible controls', async () => {
    render(<SimpleForm dossier={dossier} evidence={evidence} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
    fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Please correct')
    expect(screen.getByLabelText('Applicant name')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Applicant name')).toHaveAccessibleDescription(/2.*80/)
    expect(screen.queryByText(/Persisted appeal status/)).not.toBeInTheDocument()
  })
  it('validates representative authorization, evidence ownership and proportionality during render', async () => {
    render(<SimpleForm dossier={dossier} evidence={evidence} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit simulation appeal' })).toBeEnabled())
    fillValid()
    fireEvent.change(screen.getByLabelText('Relationship'), { target: { value: 'REPRESENTATIVE' } })
    fireEvent.change(screen.getByLabelText('Reason category'), { target: { value: 'NEW_EVIDENCE' } })
    fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
    expect(screen.getByLabelText('I am authorized to represent the applicant.')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('group', { name: 'Supporting evidence references' })).toHaveTextContent('Select at least one')
    expect(screen.queryByText(simulation.evidence[2].title)).not.toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('I am authorized to represent the applicant.'))
    fireEvent.click(screen.getByLabelText(evidence[0].title))
    fireEvent.change(screen.getByLabelText('Reason category'), { target: { value: 'PROPORTIONALITY' } })
    expect(screen.getByLabelText('Requested outcome')).toHaveAttribute('aria-invalid', 'true')
    fireEvent.change(screen.getByLabelText('Requested outcome'), { target: { value: 'REDUCE' } })
    expect(screen.getByLabelText('Requested outcome')).toHaveAttribute('aria-invalid', 'false')
    fireEvent.submit(screen.getByRole('form', { name: 'Demo appeal form' }))
    expect(await screen.findByText(/Persisted appeal status: SUBMITTED/)).toBeVisible()
  })
  it('starts a fresh draft when a different keyed dossier is selected', () => {
    const { rerender } = render(<SimpleForm key={dossier.dossierID} dossier={dossier} evidence={evidence} />)
    fillValid()
    const other = simulation.dossiers[1]
    rerender(<SimpleForm key={other.dossierID} dossier={other} evidence={simulation.evidence.filter((item) => item.dossierID === other.dossierID)} />)
    expect(screen.getByLabelText('Applicant name')).toHaveValue('')
    expect(screen.queryByLabelText(evidence[0].title)).not.toBeInTheDocument()
  })
})
