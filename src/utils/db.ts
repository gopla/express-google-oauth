import mongoose from 'mongoose'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

export async function connectDB() {
  const connectionString = `mongodb://127.0.0.1:27017/db_auth`
  return mongoose.connect(connectionString, options)
}
