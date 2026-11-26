import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App.jsx'

it('renders a clearly labeled simulation application', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getByRole('note', { name: 'Simulation notice' })).toBeVisible()
})
