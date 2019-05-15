const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi); 
const debug = require('debug')('app');


mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => debug('connected to MongoDB...'))
  .catch(err => debug('FAILED CONNECTION TO MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

app.get('/', (req, res) => {
  res.send('This is the home page. Welcome!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));