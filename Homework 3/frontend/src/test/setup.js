import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { createApiMock } from './apiMock.js'

afterEach(cleanup)
beforeEach(() => vi.stubGlobal('fetch', vi.fn(createApiMock())))
afterEach(() => vi.unstubAllGlobals())
