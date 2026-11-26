import 'dotenv/config'
import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'

const port = Number(process.env.PORT || 3002)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1–65535')
try {
  const database = await connectDatabase()
  const server = createApp({ models: database.models, clientOrigin: process.env.CLIENT_ORIGIN }).listen(port, '127.0.0.1', () => console.log(`HW3 backend listening on http://127.0.0.1:${port}`))
  server.on('error', async () => { console.error('HW3 listener failed; check PORT.'); await database.connection.close(); process.exitCode = 1 })
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close(async () => { await database.connection.close() }))
} catch (error) {
  console.error(`HW3 startup failed (${error.name}); check MONGODB_URI/connectivity. Credentials omitted.`)
  process.exitCode = 1
}
