const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rentals', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 15
      },
      isGold: {
        type: Boolean,
        default: false
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
     }),
     required: true
  },
  dateOut: {
    type: Date,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0, 
    required: true
  }
}));

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  }

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;

