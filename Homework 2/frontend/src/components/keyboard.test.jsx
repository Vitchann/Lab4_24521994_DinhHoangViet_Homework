import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'

const deck = () => screen.getByRole('region', { name: 'Bộ thẻ khám phá' })
const score = () => screen.getByLabelText('Điểm của bạn')
const entries = () => within(screen.getByRole('region', { name: 'Lịch sử tương tác' })).queryAllByRole('listitem')

describe('P2-07 scoped keyboard controls', () => {
  it.each([
    ['ArrowLeft', 'DISLIKE', '-5'], ['ArrowRight', 'LIKE', '+10'], ['ArrowUp', 'SKIP', '-5'],
  ])('%s creates exactly one %s', (key, action, points) => {
    render(<App />)
    deck().focus()
    fireEvent.keyDown(deck(), { key })
    fireEvent.keyUp(deck(), { key })
    expect(entries()).toHaveLength(1)
    expect(entries()[0]).toHaveAttribute('data-action', action)
    expect(score()).toHaveTextContent(points)
  })

  it('Backspace undoes the last action and restores derived score/card', async () => {
    const user = userEvent.setup()
    render(<App />)
    deck().focus()
    await user.keyboard('{ArrowRight}{ArrowUp}{Backspace}')
    expect(entries()).toHaveLength(1)
    expect(score()).toHaveTextContent('+10')
    expect(screen.getByRole('heading', { name: 'Minh, 29' })).toBeVisible()
  })

  it('is focusable, prevents handled defaults and suppresses held/repeat actions', () => {
    render(<App />)
    deck().focus()
    expect(deck()).toHaveFocus()
    expect(fireEvent.keyDown(deck(), { key: 'ArrowRight' })).toBe(false)
    fireEvent.keyDown(deck(), { key: 'ArrowRight', repeat: true })
    fireEvent.keyDown(deck(), { key: 'ArrowRight' })
    expect(entries()).toHaveLength(1)
    fireEvent.keyUp(deck(), { key: 'ArrowRight' })
    fireEvent.keyDown(deck(), { key: 'ArrowRight' })
    expect(entries()).toHaveLength(2)
  })

  it('does not intercept keys outside the deck', () => {
    render(<App />)
    expect(fireEvent.keyDown(document.body, { key: 'ArrowRight' })).toBe(true)
    expect(entries()).toHaveLength(0)
  })

  it.each(['input', 'textarea', 'select', 'contenteditable', 'textbox'])('leaves %s editing alone even inside the deck', (type) => {
    render(<App />)
    const element = document.createElement(['input', 'textarea', 'select'].includes(type) ? type : 'div')
    if (type === 'contenteditable') element.setAttribute('contenteditable', 'true')
    if (type === 'textbox') element.setAttribute('role', 'textbox')
    const target = type === 'contenteditable' ? element.appendChild(document.createElement('span')) : element
    deck().appendChild(element)
    expect(fireEvent.keyDown(target, { key: 'ArrowRight' })).toBe(true)
    expect(entries()).toHaveLength(0)
  })

  it.each(['ctrlKey', 'metaKey', 'altKey', 'shiftKey'])('preserves shortcuts with %s', (modifier) => {
    render(<App />)
    expect(fireEvent.keyDown(deck(), { key: 'ArrowRight', [modifier]: true })).toBe(true)
    expect(entries()).toHaveLength(0)
  })

  it('resets held keys when focus leaves the deck', () => {
    render(<App />)
    deck().focus()
    fireEvent.keyDown(deck(), { key: 'ArrowRight' })
    screen.getByRole('link', { name: /hẹn hò/ }).focus()
    deck().focus()
    fireEvent.keyDown(deck(), { key: 'ArrowRight' })
    expect(entries()).toHaveLength(2)
  })

  it('supports shortcuts from a focused control and native Enter without duplication', async () => {
    const user = userEvent.setup()
    render(<App />)
    screen.getByRole('button', { name: 'Thích', exact: true }).focus()
    await user.keyboard('{ArrowRight}{Enter}')
    expect(entries()).toHaveLength(2)
    expect(score()).toHaveTextContent('+20')
  })

  it('Backspace on empty history and arrows on empty deck are safe', async () => {
    const user = userEvent.setup()
    render(<App profiles={[]} />)
    deck().focus()
    await user.keyboard('{Backspace}{ArrowLeft}{ArrowUp}{ArrowRight}')
    expect(entries()).toHaveLength(0)
    expect(score()).toHaveTextContent('0')
  })
})
