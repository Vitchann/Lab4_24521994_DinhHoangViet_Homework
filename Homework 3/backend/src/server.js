import 'dotenv/config'
import { createApp } from './app.js'

const port = Number(process.env.PORT || 3002)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1–65535')
const server = createApp({ clientOrigin: process.env.CLIENT_ORIGIN }).listen(port, () => console.log(`HW3 backend listening on ${port}`))
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close())
