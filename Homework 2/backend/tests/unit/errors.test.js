import { describe, expect, it, vi } from 'vitest'
import { handleError } from '../../src/middleware/errors.js'

describe('release error boundary', () => {
  it('redacts unexpected errors and does not trust arbitrary error status values', () => {
    const response = { headersSent: false, status: vi.fn().mockReturnThis(), json: vi.fn() }
    const error = Object.assign(new Error('private-test-diagnostic'), { status: 200 })
    handleError(error, {}, response, vi.fn())
    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.json).toHaveBeenCalledWith({ error: { code: 'INTERNAL_ERROR', message: 'Unexpected server error' } })
  })

  it('delegates after response headers are sent instead of writing twice', () => {
    const next = vi.fn()
    const error = new Error('test error')
    const response = { headersSent: true, status: vi.fn(), json: vi.fn() }
    handleError(error, {}, response, next)
    expect(next).toHaveBeenCalledWith(error)
    expect(response.json).not.toHaveBeenCalled()
    expect(response.status).not.toHaveBeenCalled()
  })
})
