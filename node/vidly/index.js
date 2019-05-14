const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');
const debug = require('debug')('debug');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => debug('connected to MongoDB...'))
  .catch(err => debug('FAILED CONNECTION TO MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('This is the home page. Welcome!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));