const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  loggedIn: {
    type: Boolean,
    required: false
  },
  token: {
    type: String,
    required: false
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ]
})

UserSchema.statics.removeUser = (id) => {
  const User = mongoose.model('users');
  const Category = mongoose.model('categories');
  
  return User.findById({ _id: id }).then(user => {
    user.products.forEach((userProduct, idx1) => {
      return Category.findById(userProduct.category).then(category => {
        category.products.forEach((catProduct, idx2) => {
          if (userProduct == catProduct) {
            catProduct.splice(idx2, 1)
          }
        })
        return User.deleteOne(user);
      })
    })
  })

}

module.exports = mongoose.model('users', UserSchema)