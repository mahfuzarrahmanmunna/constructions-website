// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error(
//     "The MONGODB_URI environment variable is required but was not provided."
//   );
// }

// const options = {};

// declare global {
//   // eslint-disable-next-line no-var
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// const client = new MongoClient(uri, options);
// const clientPromise = global._mongoClientPromise ??= client.connect();

// export default clientPromise;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}