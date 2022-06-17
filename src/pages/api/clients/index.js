import dbConnection from '../../../services/db'

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { db } = await dbConnection()
        let response = await db.collection('Client').find({}).toArray()
        res.status(200).json(response)
      } catch (error) {
        console.log('error:', error)
        res.status(500).json({ error: error })
      }
      break

    case 'POST':
      try {
        const { name, email } = req.body
        if (!name || !email) {
          res.status(400).json({ error: 'Missing body param' })
          return
        }

        const { db } = await dbConnection()
        const response = await db.collection('Client').insertOne({
          name,
          email
        })
        res.status(200).json(response)
      } catch (error) {
        console.log('error:', error)
        res.status(500).json({ error: error })
      }
      break
  }
}
