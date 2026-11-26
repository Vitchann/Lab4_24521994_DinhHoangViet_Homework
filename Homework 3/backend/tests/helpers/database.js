import { randomUUID } from 'node:crypto'
import { connectDatabase } from '../../src/config/database.js'

export async function createTestDatabase() {
  const name = `hw3_test_${randomUUID().replaceAll('-', '')}`
  const uri = process.env.MONGODB_TEST_URI || 'mongodb://127.0.0.1:27017'
  const address = new URL(uri)
  address.pathname = `/${name}`
  const databaseUri = address.href
  const database = await connectDatabase(databaseUri)
  if (database.connection.name !== name || !/^hw3_test_[a-f0-9]+$/.test(database.connection.name)) {
    await database.connection.close()
    throw new Error('Refusing test cleanup outside the generated HW3 test database')
  }
  return { ...database, uri: databaseUri, async cleanup() {
    const active = database.connection.readyState === 0 ? await connectDatabase(databaseUri) : database
    if (active.connection.name !== name || !/^hw3_test_[a-f0-9]+$/.test(name)) throw new Error('Unsafe database cleanup target')
    await active.connection.dropDatabase()
    await active.connection.close()
  } }
}
