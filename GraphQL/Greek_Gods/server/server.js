const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys.js').MONGO_URI;

const app = express();

if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlass');
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

const { graphqlHTTP } = require('express-graphql');
const models = require('./models')
const schema = require('./schema/schema');

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.use(bodyParser.json());

module.exports = app;