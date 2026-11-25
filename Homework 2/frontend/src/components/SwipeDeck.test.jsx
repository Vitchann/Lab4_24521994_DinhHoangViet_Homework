import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { demoProfiles } from '../data/profiles.js'

const current = () => screen.getByRole('region', { name: 'Hồ sơ hiện tại' })
const score = () => screen.getByLabelText('Điểm của bạn')
const history = () => screen.getByRole('region', { name: 'Lịch sử tương tác' })

describe('P2-06 card deck and controls', () => {
  it('shows current profile, remaining count, zero score and empty history', () => {
    render(<App />)
    expect(within(current()).getByRole('heading', { name: 'Linh, 26' })).toBeVisible()
    expect(within(current()).getByRole('img', { name: /Minh họa.*Linh/ })).toBeVisible()
    expect(score()).toHaveTextContent('0')
    expect(screen.getByText('Còn 6 hồ sơ')).toBeVisible()
    expect(within(history()).getByText('Chưa có tương tác nào')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Hoàn tác' })).toBeDisabled()
  })

  it.each([
    ['Không thích', 'DISLIKE', '-5'], ['Thích', 'LIKE', '+10'], ['Bỏ qua', 'SKIP', '-5'],
  ])('%s records %s once with %s points', async (button, action, points) => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: button, exact: true }))
    expect(within(current()).getByRole('heading', { name: 'Minh, 29' })).toBeVisible()
    expect(screen.getByText('Còn 5 hồ sơ')).toBeVisible()
    expect(score()).toHaveTextContent(points)
    const items = within(history()).getAllByRole('listitem')
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveTextContent('Linh')
    expect(items[0]).toHaveAttribute('data-action', action)
  })

  it('undoes LIFO and derives restored score and card after mixed actions', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (const label of ['Thích', 'Bỏ qua', 'Không thích']) {
      await user.click(screen.getByRole('button', { name: label, exact: true }))
    }
    expect(score()).toHaveTextContent('0')
    await user.click(screen.getByRole('button', { name: 'Hoàn tác' }))
    expect(score()).toHaveTextContent('+5')
    expect(within(current()).getByRole('heading', { name: 'An, 25' })).toBeVisible()
    expect(within(history()).getAllByRole('listitem')).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'Hoàn tác' }))
    expect(score()).toHaveTextContent('+10')
    expect(within(current()).getByRole('heading', { name: 'Minh, 29' })).toBeVisible()
  })

  it('disables swipes at completion and undo reopens the last card', () => {
    render(<App profiles={demoProfiles.slice(0, 1)} />)
    fireEvent.click(screen.getByRole('button', { name: 'Thích', exact: true }))
    expect(screen.getByText('Bạn đã khám phá hết rồi!')).toBeVisible()
    expect(screen.getByText('Còn 0 hồ sơ')).toBeVisible()
    for (const label of ['Thích', 'Không thích', 'Bỏ qua']) {
      expect(screen.getByRole('button', { name: label, exact: true })).toBeDisabled()
    }
    fireEvent.click(screen.getByRole('button', { name: 'Hoàn tác' }))
    expect(within(current()).getByRole('heading', { name: 'Linh, 26' })).toBeVisible()
    expect(score()).toHaveTextContent('0')
  })

  it('handles a genuinely empty deck and history without broken controls', () => {
    render(<App profiles={[]} />)
    expect(screen.getByText('Chưa có hồ sơ để khám phá')).toBeVisible()
    expect(within(history()).getByText('Chưa có tương tác nào')).toBeVisible()
    expect(score()).toHaveTextContent('0')
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
  })
})
