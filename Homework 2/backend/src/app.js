import express from 'express'
import cors from 'cors'
import { handleError } from './middleware/errors.js'

export function createApp({ clientOrigin = 'http://localhost:5173' } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '16kb' }))
  // Future application routes belong here, before the fallbacks.
  app.use((_request, response) => {
    response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
  })
  app.use(handleError)
  return app
}
