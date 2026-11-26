import { randomUUID } from 'node:crypto'
import { connectDatabase } from '../../src/config/database.js'

export async function createTestDatabase() {
  const name = `hw3_test_${randomUUID().replaceAll('-', '')}`
  const uri = process.env.MONGODB_TEST_URI || 'mongodb://127.0.0.1:27017'
  const database = await connectDatabase(new URL(name, uri.endsWith('/') ? uri : `${uri}/`).href)
  if (database.connection.name !== name || !/^hw3_test_[a-f0-9]+$/.test(database.connection.name)) {
    await database.connection.close()
    throw new Error('Refusing test cleanup outside the generated HW3 test database')
  }
  return { ...database, async cleanup() { await database.connection.dropDatabase(); await database.connection.close() } }
}
