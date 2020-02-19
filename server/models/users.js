const {mongoose} = require('../db/mongoose');
const validator = require('validator');

var user = mongoose.model('user', new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}));

module.exports = {user};
