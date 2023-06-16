import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>
}

 if (!globalWithMongo._mongoClientPromise) {
   client = new MongoClient(uri, options);
   globalWithMongo._mongoClientPromise = client.connect();
 }
 clientPromise = globalWithMongo._mongoClientPromise;

export default clientPromise;