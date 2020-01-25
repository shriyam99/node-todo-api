const {mongoose} = require('../db/mongoose');

var user = mongoose.model('user', new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}));

module.exports = {user};
