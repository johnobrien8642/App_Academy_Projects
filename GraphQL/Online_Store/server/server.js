const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const models = require('./models/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys').MONGO_URI;
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas');
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err))


app.use(bodyParser.json());
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP(req => {
    return{
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
);

module.exports = app;