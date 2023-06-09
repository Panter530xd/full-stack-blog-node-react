import { MongoClient, Db } from "mongodb";

let db: Db;

async function connectToDb(cb: () => void) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dl1a14k.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();
  db = client.db("react-blog-db");
  cb();
}

export { db, connectToDb };
