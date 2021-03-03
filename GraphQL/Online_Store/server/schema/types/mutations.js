const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Category = mongoose.model('categories');
const CategoryType = require('./category_type');
const Product = mongoose.model('products');
const ProductType = require('./product_type');
const User = mongoose.model('users');
const UserType = require('./user_type');
const AuthService = require('../../services/auth')

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      resolve(parentValue, { name, email, password, date }) {
        return new User({ name, email, password, date }).save();
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }) {
        return User.removeUser(_id)
      }
    },
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }) {
        return Category.removeCategory(_id)
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLID },
        weight: { type: GraphQLFloat }
      },
      async resolve(parentValue, { name, description, category, weight }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token })
    
        if (validUser.loggedIn) {
          const newProduct = new Product({ name, user: validUser._id, description, category, weight })
          return Category.findById({ 
              _id: category
            }).then(category => {
              category.products.push(newProduct)
  
              return User.findById({
                _id: validUser._id
              }).then(user => {
                user.products.push(newProduct)
  
                return Promise.all([newProduct.save(), category.save(), user.save()]).then(
                  ([newProduct, category, user]) => (newProduct, category, user)
                )
              })
            })
        } else {
          throw new Error('Sorry, you need to be logged in to create a product.')
        }
      }
    },
    deleteProduct: {
      type: ProductType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }) {
        return Product.removeProduct(_id)
      }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(parentValue, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId)
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        token: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout()
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args)
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
})

module.exports = mutation;