import 'dotenv/config'
import { connectDatabase } from '../src/config/database.js'
import { seedDatabase } from '../src/seed.js'

let database
try {
  database = await connectDatabase()
  console.log(JSON.stringify(await seedDatabase(database.models)))
} catch (error) {
  console.error(`HW3 seed failed (${error.name}); check database connectivity and seed consistency. Credentials omitted.`)
  process.exitCode = 1
} finally { await database?.connection.close() }
