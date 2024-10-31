import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// This should be the connection string from your VS Code extension
// Copy it from the extension by right-clicking your connection and selecting "Copy Connection String"
const uri = process.env.MONGODB_URI
const options = {
  // No need for SSL/TLS options if they're already in your connection string
}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri)
clientPromise = client.connect()

export default clientPromise 
