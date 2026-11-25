import express from 'express'
import cors from 'cors'

export function createApp({ clientOrigin = 'http://localhost:5173' } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '16kb' }))
  return app
}
