import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import AppRoutes from './AppRoutes.jsx'
import App from '../App.jsx'

const visit = (path) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>)

describe('P3-04 routing acceptance contract', () => {
  it('renders the overview within a shared semantic layout and explicit simulation notice', () => {
    visit('/')
    expect(screen.getByRole('heading', { level: 1, name: 'Fair play starts with a fair review.' })).toBeVisible()
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getByRole('note', { name: 'Simulation notice' })).toHaveTextContent(/not official findings/i)
    expect(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page')
  })

  it('navigates through registry and dossier while preserving the shared layout', async () => {
    const user = userEvent.setup()
    visit('/')
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    const notice = screen.getByRole('note', { name: 'Simulation notice' })
    await user.click(within(navigation).getByRole('link', { name: 'Dossier registry' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Case dossiers' })).toBeVisible()
    expect(within(navigation).getByRole('link', { name: 'Dossier registry' })).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('link', { name: 'Open dossier for Player Beta' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Player Beta' })).toBeVisible()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBe(navigation)
    expect(screen.getByRole('note', { name: 'Simulation notice' })).toBe(notice)
  })

  it.each([
    ['sim-himass', 'Player Alpha', 'Training protocol review', 'Roster notice sample'],
    ['sim-tanvuu', 'Player Beta', 'Roster notice review', 'Scrim replay index'],
  ])('resolves dynamic dossier %s without another case leaking into it', (id, player, title, excluded) => {
    visit(`/dossier/${id}`)
    expect(screen.getByRole('heading', { level: 1, name: player })).toBeVisible()
    expect(screen.getByRole('heading', { name: title })).toBeVisible()
    expect(screen.queryByText(excluded)).not.toBeInTheDocument()
    const evidence = screen.getByRole('region', { name: 'Evidence references' })
    expect(within(evidence).getAllByRole('listitem')).toHaveLength(2)
    expect(evidence).toHaveTextContent('simulation://')
    expect(evidence).toHaveTextContent(/simulated/i)
  })

  it('shows demonstration sanction and an ordered timestamped case timeline', () => {
    visit('/dossier/sim-himass')
    const sanction = screen.getByRole('region', { name: 'Demonstration sanction' })
    expect(within(sanction).getByRole('heading', { name: '7-day training restriction' })).toBeVisible()
    expect(sanction).toHaveTextContent(/not an official decision/i)
    const timeline = screen.getByRole('list', { name: 'Case timeline' })
    expect(within(timeline).getAllByRole('listitem')).toHaveLength(3)
    const dates = [...timeline.querySelectorAll('time')].map((element) => element.dateTime)
    expect(dates).toHaveLength(3)
    expect(dates).toEqual([...dates].sort())
  })

  it.each(['unknown', 'toString', '__proto__', 'SIM-HIMASS', '%00', 'sim-missing'])('handles unknown/invalid player ID %s and recovers to registry', async (id) => {
    const user = userEvent.setup()
    visit(`/dossier/${id}`)
    expect(screen.getByRole('heading', { level: 1, name: 'Dossier not found' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Player Alpha' })).not.toBeInTheDocument()
    expect(screen.getByRole('note', { name: 'Simulation notice' })).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Back to registry' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Case dossiers' })).toBeVisible()
  })

  it.each(['/missing', '/dossier', '/dossier/sim-himass/extra'])('handles unknown route %s in the shared layout', (path) => {
    visit(path)
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Back to registry' })).toHaveAttribute('href', '/dossiers')
  })

  it('explains reference labels and does not introduce an appeal form', () => {
    visit('/about')
    expect(screen.getByRole('heading', { level: 1, name: 'About this simulation' })).toBeVisible()
    expect(screen.getByText('Reference names are labels, not findings.')).toBeVisible()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
  })

  it('renders the default BrowserRouter application on an initially deep-linked URL', () => {
    window.history.replaceState({}, '', '/dossier/sim-tanvuu')
    try {
      render(<App />)
      expect(screen.getByRole('heading', { level: 1, name: 'Player Beta' })).toBeVisible()
    } finally { window.history.replaceState({}, '', '/') }
  })
})
