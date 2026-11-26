import express from 'express'
import cors from 'cors'
import { createTribunalService } from './services/tribunal.js'
import { createApiRouter } from './routes/api.js'
import { HttpError, errorHandler } from './middleware/errors.js'

export function createApp({ clientOrigin = 'http://127.0.0.1:5174,http://localhost:5174', models, service, now = Date.now } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: clientOrigin.split(',').map((origin) => origin.trim()) }))
  app.use((_request, response, next) => { response.set('Cache-Control', 'no-store'); next() })
  app.use(express.json({ limit: '32kb' }))
  app.use('/api', createApiRouter(service || createTribunalService(models, now), now))
  app.use(() => { throw new HttpError(404, 'NOT_FOUND', 'Route not found.') })
  app.use(errorHandler)
  return app
}
