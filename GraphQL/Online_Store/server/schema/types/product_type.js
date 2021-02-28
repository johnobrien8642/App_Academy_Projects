const graphql = require('graphql');
const mongoose = require('mongoose');
const Category = mongoose.model('categories');
const User = mongoose.model('users');
const CategoryType = require('./category_type')
const UserType = require('./user_type')
const { GraphQLObjectType, GraphQLString, 
        GraphQLID, GraphQLList, 
        GraphQLFloat, GraphQLInt } = graphql;

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    cost: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
      }
    },
    category: { 
      type: CategoryType,
      resolve(parentValue) {
        return Category.findById(parentValue.category)
          .then(category => category)
      }
    },
  })
})

module.exports = ProductType;