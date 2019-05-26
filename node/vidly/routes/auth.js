const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validatePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validatePassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);

});

function validate(req) {
  let schema = {
    email: Joi.string().required().min(3).max(50).email(),
    password: Joi.string().required().min(5).max(1024)
  }

  return Joi.validate(req, schema);
}

module.exports = router;