const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
  let schema = {
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50).email(),
    password: Joi.string().required().min(5).max(1024)
  }

  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;