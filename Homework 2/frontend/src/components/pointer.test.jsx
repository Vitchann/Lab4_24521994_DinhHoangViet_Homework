import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'

const card = () => screen.getByRole('region', { name: 'Hồ sơ hiện tại' })
const entries = () => within(screen.getByRole('region', { name: 'Lịch sử tương tác' })).queryAllByRole('listitem')
const point = (x, y, extra = {}) => ({ pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, clientX: x, clientY: y, ...extra })
const gesture = (x, y, extra = {}) => {
  const element = card()
  fireEvent.pointerDown(element, point(150, 150, extra))
  fireEvent.pointerMove(element, point(150 + x, 150 + y, extra))
  fireEvent.pointerUp(element, point(150 + x, 150 + y, extra))
}

describe('P2-08 pointer gestures', () => {
  it.each([
    ['mouse', -50, 0, 'DISLIKE', '-5'], ['mouse', 50, 0, 'LIKE', '+10'],
    ['mouse', 0, -50, 'SKIP', '-5'], ['touch', -65, 10, 'DISLIKE', '-5'],
    ['touch', 65, 10, 'LIKE', '+10'], ['touch', 10, -65, 'SKIP', '-5'],
  ])('%s displacement (%i,%i) commits %s once', (pointerType, x, y, action, score) => {
    render(<App />)
    gesture(x, y, { pointerType })
    expect(entries()).toHaveLength(1)
    expect(entries()[0]).toHaveAttribute('data-action', action)
    expect(screen.getByLabelText('Điểm của bạn')).toHaveTextContent(score)
    expect(screen.getByRole('heading', { name: 'Minh, 29' })).toBeVisible()
  })

  it.each([[49, 0], [-49, 0], [0, -49], [0, 80], [65, 90], [50, -50], [0, 0]])('ignores short/downward/ambiguous displacement (%i,%i)', (x, y) => {
    render(<App />)
    gesture(x, y)
    expect(entries()).toHaveLength(0)
  })

  it('tracks movement visually but only commits on release and ignores duplicate releases', () => {
    render(<App />)
    const element = card()
    fireEvent.pointerDown(element, point(150, 150))
    fireEvent.pointerMove(element, point(215, 150))
    expect(entries()).toHaveLength(0)
    expect(element).toHaveAttribute('data-dragging', 'true')
    fireEvent.pointerUp(element, point(215, 150))
    fireEvent.pointerUp(element, point(215, 150))
    expect(entries()).toHaveLength(1)
    expect(card()).toHaveAttribute('data-dragging', 'false')
  })

  it('uses final displacement when a threshold-crossing drag returns to origin', () => {
    render(<App />)
    fireEvent.pointerDown(card(), point(150, 150))
    fireEvent.pointerMove(card(), point(230, 150))
    fireEvent.pointerUp(card(), point(155, 150))
    expect(entries()).toHaveLength(0)
    expect(card()).toHaveAttribute('data-dragging', 'false')
  })

  it.each(['pointerCancel', 'lostPointerCapture'])('%s resets and prevents a later release from committing', (event) => {
    render(<App />)
    fireEvent.pointerDown(card(), point(150, 150))
    fireEvent.pointerMove(card(), point(240, 150))
    fireEvent[event](card(), point(240, 150))
    fireEvent.pointerUp(card(), point(240, 150))
    expect(entries()).toHaveLength(0)
    expect(card()).toHaveAttribute('data-dragging', 'false')
    gesture(-60, 0)
    expect(entries()).toHaveLength(1)
  })

  it('captures/releases the pointer and ignores unrelated pointer IDs', () => {
    render(<App />)
    const element = card()
    element.setPointerCapture = vi.fn()
    element.hasPointerCapture = vi.fn(() => true)
    element.releasePointerCapture = vi.fn()
    fireEvent.pointerDown(element, point(150, 150))
    expect(element.setPointerCapture).toHaveBeenCalledWith(1)
    fireEvent.pointerUp(element, point(230, 150, { pointerId: 2 }))
    expect(entries()).toHaveLength(0)
    fireEvent.pointerUp(element, point(230, 150))
    expect(entries()).toHaveLength(1)
    expect(element.releasePointerCapture).toHaveBeenCalledWith(1)
  })

  it.each([{ button: 2 }, { isPrimary: false }])('ignores nonprimary input %j', (extra) => {
    render(<App />)
    gesture(70, 0, extra)
    expect(entries()).toHaveLength(0)
  })

  it('cancels when a second touch arrives', () => {
    render(<App />)
    fireEvent.pointerDown(card(), point(150, 150, { pointerType: 'touch' }))
    fireEvent.pointerDown(card(), point(170, 150, { pointerId: 2, pointerType: 'touch', isPrimary: false }))
    fireEvent.pointerUp(card(), point(230, 150, { pointerType: 'touch' }))
    expect(entries()).toHaveLength(0)
  })

  it('never swipes the new card when a button changes history during a drag', () => {
    render(<App />)
    fireEvent.pointerDown(card(), point(150, 150))
    fireEvent.pointerMove(card(), point(230, 150))
    fireEvent.click(screen.getByRole('button', { name: 'Thích', exact: true }))
    fireEvent.pointerUp(card(), point(230, 150))
    expect(entries()).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Minh, 29' })).toBeVisible()
    expect(card()).toHaveAttribute('data-dragging', 'false')
  })

  it('ignores orphan releases and safely handles an empty deck', () => {
    render(<App profiles={[]} />)
    fireEvent.pointerUp(card(), point(230, 150))
    gesture(70, 0)
    expect(entries()).toHaveLength(0)
    expect(screen.getByLabelText('Điểm của bạn')).toHaveTextContent('0')
  })

  it('resets an interrupted gesture when the browser loses focus', () => {
    render(<App />)
    fireEvent.pointerDown(card(), point(150, 150))
    fireEvent.pointerMove(card(), point(230, 150))
    fireEvent.blur(window)
    fireEvent.pointerUp(card(), point(230, 150))
    expect(entries()).toHaveLength(0)
    expect(card()).toHaveAttribute('data-dragging', 'false')
    gesture(60, 0)
    expect(entries()).toHaveLength(1)
  })
})
