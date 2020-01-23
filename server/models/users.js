const {mongoose} = require('../db/mongoose');

var user = mongoose.model('user', new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    default: 'abc123@email.com'
  },
}));

module.exports = {user};
