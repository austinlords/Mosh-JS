const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

let genres = [
  { id: 1, name: 'horror' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },
  { id: 4, name: 'action' },
  { id: 5, name: 'children' }
];

function validateGenre(genre) {
  let schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

router.get('/', (req, res) => {
  res.send(genres);
})

router.get('/:id', (req, res) => {
  let genre = genres.find(obj => obj.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');
  
  res.send(genre);
})

router.post('/', (req, res) => {
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let genre = genres.find(obj => obj.name === req.body.name);
  if (genre) return res.status(400).send('This genre already exists');
  
  genre = {
    id: genres[genres.length-1].id + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre); 
})

router.put('/:id', (req, res) => {
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  genre.name = req.body.name;
  res.send(genre);
})

router.delete('/:id', (req, res) => {
  let genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  let index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre)
})

module.exports = router;
