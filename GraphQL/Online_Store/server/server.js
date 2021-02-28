const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const models = require('./models/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys').MONGO_URI;
const schema = require('./schema/schema')

const app = express();

if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas');
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err))


app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

module.exports = app;