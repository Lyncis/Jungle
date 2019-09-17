import mongoose from 'mongoose';
require('dotenv').config()
import products from './schema.model'

const connectDb = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    // user: process.env.MONGODB_USER,
    // pass: process.env.MONGODB_PASS
  }
  return mongoose.connect(process.env.MONGODB_URL, options);
}

const models = {
  products
}

export {
  connectDb
}

export default models
