import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'
import { demoProfiles } from '../data/profiles.js'

describe('P2-15 release accessibility regressions', () => {
  it('keeps keyboard focus in the deck when completing the final card', async () => {
    const user = userEvent.setup()
    render(<App profiles={demoProfiles.slice(0, 1)} />)
    screen.getByRole('button', { name: 'Thích', exact: true }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('region', { name: 'Bộ thẻ khám phá' })).toHaveFocus()
    await user.keyboard('{Backspace}')
    expect(screen.getByRole('heading', { name: 'Linh, 26' })).toBeVisible()
  })

  it('keeps focus in the deck when the last undo disables its button', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Thích', exact: true }))
    await user.click(screen.getByRole('button', { name: 'Hoàn tác' }))
    expect(screen.getByRole('region', { name: 'Bộ thẻ khám phá' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByLabelText('Điểm của bạn')).toHaveTextContent('+10')
  })

  it('does not submit a containing form when a swipe button is activated', async () => {
    const user = userEvent.setup()
    const submit = vi.fn((event) => event.preventDefault())
    render(<form onSubmit={submit}><App /></form>)
    await user.click(screen.getByRole('button', { name: 'Thích', exact: true }))
    expect(submit).not.toHaveBeenCalled()
  })

  it('leaves composing and already-handled keyboard events alone', () => {
    render(<App />)
    const deck = screen.getByRole('region', { name: 'Bộ thẻ khám phá' })
    fireEvent.keyDown(deck, { key: 'ArrowRight', isComposing: true })
    const handled = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    handled.preventDefault()
    fireEvent(deck, handled)
    expect(screen.getByLabelText('Điểm của bạn')).toHaveTextContent('0')
  })
})
