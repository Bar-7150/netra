import mongoose from 'mongoose'

let cached = globalThis.mongooseConnection

if (!cached) {
  cached = globalThis.mongooseConnection = { connection: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.connection) return cached.connection

  const mongoUri = process.env.MONGO_URI
  if (!mongoUri) throw new Error('Missing MONGO_URI environment variable')

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME || undefined,
      bufferCommands: false,
    })
  }

  try {
    cached.connection = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.connection
}
