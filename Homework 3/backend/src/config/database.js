import mongoose from 'mongoose'
import { createModels } from '../models/index.js'

export async function connectDatabase(uri = process.env.MONGODB_URI) {
  if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) throw new Error('MONGODB_URI must be configured with a MongoDB URI')
  const connection = await mongoose.createConnection(uri, { serverSelectionTimeoutMS: 3000, bufferCommands: false }).asPromise()
  try {
    const models = createModels(connection)
    await Promise.all(Object.values(models).map((model) => model.init()))
    return { connection, models }
  } catch (error) { await connection.close(); throw error }
}
