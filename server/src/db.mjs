
import { MongoClient, ObjectId } from "mongodb";

// Singleton class. Normally I want just one database for my applications.
// Feel free to replace instance with instances object where dbs can be accessed by name.
async function Database(name) {
  if (!Database.instance) {
    const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
    Database.instance = await init(url, name);
  }
  return Database.instance;
}

// Establish connection with database
async function init(url, name) {
  return new Promise((resolve, reject) => {
    const cl = new MongoClient(url, { useUnifiedTopology: true });
    cl.connect((err, client) => {
      if (err) {
        reject(err);
        return;
      }
      const db = client.db(name);
      resolve(db);
    })
  })
}

// Trick for nice syntax. Now any file can import { db } from "./db.js";
const db = new Proxy({}, {
  get(_, prop) {
    if (Database.instance) {
      return Database.instance[prop];
    }
    return undefined;
  }
});

export {
  init,
  Database,
  db
}
