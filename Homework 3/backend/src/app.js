import express from 'express'
import cors from 'cors'

export function createApp({ clientOrigin = 'http://localhost:5174' } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '32kb' }))
  app.use((_request, response) => response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not implemented' } }))
  app.use((error, _request, response, next) => {
    if (response.headersSent) return next(error)
    const status = [400, 413, 415].includes(error.status) ? error.status : 500
    return response.status(status).json({ error: { code: 'REQUEST_ERROR', message: 'Request could not be processed' } })
  })
  return app
}
