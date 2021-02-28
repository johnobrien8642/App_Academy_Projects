const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: false
  }
})

ProductSchema.statics.removeProduct = (productId) => {
  const Product = mongoose.model('products');
  const User = mongoose.model('users');
  const Category = mongoose.model('categories')

  return Product.findById({ _id: productId }).then(product => {
    return User.findById({ _id: product.user }).then(user => {
      user.products.pull(product)
      user.save();
      return Category.findById({ _id: product.category }).then(category => {
        category.products.pull(product)
        category.save();
        return Product.deleteOne(product);
      })
    })
  })
}

ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
  const Product = mongoose.model('products');
  const Category = mongoose.model('categories');

  return Product.findById(productId).then(product => {
    if (product.category) {
      Category.findById(product.category).then(oldcategory => {
        oldcategory.products.pull(product);
        return oldcategory.save()
      })
    }

    return Category.findById(categoryId).then(newCategory => {
      product.category = newCategory;
      newCategory.products.push(product);

      return Promise.all([product.save(), newCategory.save()]).then(
        ([product, newCategory]) => product
      )
    })
  })
}

module.exports = mongoose.model('products', ProductSchema)