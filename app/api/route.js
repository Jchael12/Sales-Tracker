const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = import("mongoose").then((mongoose) => {
      return mongoose.default.connect(uri, opts);
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
