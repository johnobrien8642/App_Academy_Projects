const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, 
        GraphQLID, GraphQLString, 
        GraphQLList, GraphQLBoolean } = graphql
const User = mongoose.model('users')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    date: { type: GraphQLString },
    password: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    products: {
      type: new GraphQLList(require('./product_type')),
        resolve(parentValue) {
          return User.findById(parentValue._id)
            .populate('products')
            .then(user => user.products);
        }
    }
  })
})

module.exports = UserType;