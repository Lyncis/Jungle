import mongoose from 'mongoose'

const { Schema } = mongoose

let Products = null

try {
  const productsSchema = new Schema({
    asin: { type: String, unique: true },
    rank: String,
    category: String,
    dimension: String
  })
  // If asin is unique, then it's already has index and the command below is useless?
  productsSchema.index({ asin: 1})

  Products = mongoose.model('products', productsSchema)

  // products.listIndexes().then(indexes => {
  //   console.log("indexes:", indexes);
  // }).catch(console.error);
} catch (e) {
  console.log(e)
  // Already exists
  Products = mongoose.model('products')
}

export default Products
