import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB_URL + '', {
  useNewUrlParser: true,
  useUnifiedTOpology: true
})

async function dbConnection() {
  await client.connect()
  const db = client.db('crud-next')
  return { db, client }
}

export default dbConnection
