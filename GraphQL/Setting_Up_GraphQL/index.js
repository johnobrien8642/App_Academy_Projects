const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!!!'));

app.listen(5000, () => console.log('Server is running on port 5000'));

