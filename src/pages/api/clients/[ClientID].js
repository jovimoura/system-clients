import dbConnection from "../../../services/db"
import { ObjectId } from "mongodb"

export default async (req, res) => {
  const { method } = req
  const { ClientID } = req.query

  switch (method) {
    case 'PUT':
      try {
        const { name, email } = req.body
        if (!name || !email) {
          res.status(400).json({ error: 'Missing body param' })
          return
        }

        const { db } = await dbConnection()
        const response = await db.collection('Client').updateOne({ _id: ObjectId(ClientID) }, {$set: {
          name,
          email
        }})
        res.status(200).json(response)
      } catch (error) {
        console.log('error:', error)
        res.status(500).json({ error: error })
      }
      break;
    
    case 'DELETE':
      try {
        const { db } = await dbConnection()
        const response = await db.collection('Client').deleteOne({_id: ObjectId(ClientID)})
        res.status(200).json(response)
      } catch (error) {
        console.log('error:', error)
        res.status(500).json({ error: error })
      }
      break
  }
}
