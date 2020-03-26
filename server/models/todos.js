const {mongoose} = require('../db/mongoose');

var todo = mongoose.model('Todo', ({     //creating a model
  text: {
    type: String,    // we can set properties like required and type etc..
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {   //id of creator of this todo
    type: mongoose.Schema.Types.ObjectID,
    required: true
  }
}));

module.exports = {todo};
