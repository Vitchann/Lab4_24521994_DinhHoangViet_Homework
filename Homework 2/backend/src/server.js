import 'dotenv/config'
import { createApp } from './app.js'

const port = Number(process.env.PORT || 3001)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

const app = createApp({ clientOrigin: process.env.CLIENT_ORIGIN })
const server = app.listen(port, () => {
  console.log(`Development server listening on port ${port}`)
})
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close())
}
