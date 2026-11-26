import { StrictMode } from 'react'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, cleanup } from '@testing-library/react'
import { useAppealSlaTimer } from './useAppealSlaTimer.js'

const start = Date.parse('2026-12-05T08:59:50.000Z')
const deadline = '2026-12-05T09:00:00.000Z'
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(start) })
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers() })

describe('absolute-clock SLA hook', () => {
  it('renders initial time then recomputes from Date.now on each callback', () => {
    const { result } = renderHook(() => useAppealSlaTimer(deadline))
    expect(result.current).toMatchObject({ status: 'active', remainingMs: 10000 })
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.remainingMs).toBe(9000)
  })
  it('does not accumulate drift when interval execution is delayed', () => {
    const { result } = renderHook(() => useAppealSlaTimer(deadline))
    vi.setSystemTime(start + 8500)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.remainingMs).toBe(500)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current).toMatchObject({ status: 'expired', remainingMs: 0 })
  })
  it('resynchronizes immediately when returning from a background tab', () => {
    const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
    const { result } = renderHook(() => useAppealSlaTimer(deadline))
    vi.setSystemTime(start + 20000)
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(result.current.remainingMs).toBe(10000)
    visibility.mockReturnValue('visible')
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(result.current).toMatchObject({ status: 'expired', remainingMs: 0 })
  })
  it('derives replacement and invalid deadlines without retaining prior remaining time', () => {
    const { result, rerender } = renderHook(({ value }) => useAppealSlaTimer(value), { initialProps: { value: deadline } })
    rerender({ value: '2026-12-05T08:59:49.000Z' })
    expect(result.current).toMatchObject({ status: 'expired', remainingMs: 0 })
    rerender({ value: 'invalid' })
    expect(result.current).toMatchObject({ status: 'invalid', remainingMs: 0 })
  })
  it('supports explicit resampling without an interval tick', () => {
    const { result } = renderHook(() => useAppealSlaTimer(deadline))
    vi.setSystemTime(start + 4500)
    act(() => result.current.refresh())
    expect(result.current.remainingMs).toBe(5500)
  })
  it('cleans interval and identical visibility listeners even under StrictMode', () => {
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => useAppealSlaTimer(deadline), { wrapper: StrictMode })
    expect(vi.getTimerCount()).toBe(1)
    const handlers = add.mock.calls.filter(([name]) => name === 'visibilitychange').map(([, handler]) => handler)
    expect(handlers).toHaveLength(2)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
    for (const handler of handlers) expect(remove).toHaveBeenCalledWith('visibilitychange', handler)
  })
})
