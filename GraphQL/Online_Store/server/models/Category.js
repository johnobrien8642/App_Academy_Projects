const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ] 
})

CategorySchema.statics.removeCategory = (categoryId) => {
  const Category = mongoose.model('categories');

  return Category.findById({
    _id: categoryId
  }).then(category => {
    category.products.forEach((product, i) => {
      product.category = null;
      product.save();
    })

    category.deleteOne();
  })
}

module.exports = mongoose.model('categories', CategorySchema)