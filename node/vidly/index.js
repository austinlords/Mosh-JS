const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());

let genres = [
  { id: 1, name: 'horror' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },
  { id: 4, name: 'action' },
  { id: 5, name: 'children' }
];


app.get('/', (req, res) => {
  res.send('This is the home page. Welcome!');
})

app.get('/api/genres', (req, res) => {
  res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
  let genre = genres.find(obj => obj.id == req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  
  res.send(genre);
})

app.post('/api/genres', (req, res) => {
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let genre = genres.find(obj => obj.name === req.body.name);
  if (genre)
    return res.status(400).send('This genre already exists');
  
  let newGenre = req.body;
  newGenre.id = genres.length + 1;
  genres.push(newGenre);
  res.send(newGenre); 
})

app.put('/api/genres/:id', (req, res) => {
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(400).send('This genre does not exist');

  genre.name = req.body.name;
  res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
  let genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('This genre does not exist');

  let index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre)
})

function validateGenre(genre) {
  let schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));