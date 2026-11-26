import { expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import DisproportionalityMatrix from './DisproportionalityMatrix.jsx'
import { simulation } from '../data/simulation.js'

it('shows an accessible comparison table with explicit assumptions and simulation limits', () => {
  render(<DisproportionalityMatrix dataset={simulation} />)
  const table = screen.getByRole('table', { name: 'Illustrative sanction comparison' })
  expect(within(table).getAllByRole('row')).toHaveLength(3)
  expect(within(table).getByRole('rowheader', { name: 'Player Alpha' })).toBeVisible()
  expect(within(table).getByRole('columnheader', { name: 'Excess units' })).toBeVisible()
  expect(screen.getByText(/not an authoritative disciplinary judgment/)).toBeVisible()
  expect(screen.getByText(/10 units per day/)).toHaveTextContent('40')
})
