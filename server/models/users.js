const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = mongoose.Schema({
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
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); //convert the user to have only props which we saved
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.getAuthToken = function() {   //arrow function not used to bind 'this'
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'saitama').toString();
  user.tokens.push({access, token});
  return user.save().then(()=>{     //returning a promise
    return token;   //this is valid bcoz we can access token from the .then() call again
  });
}

var User = mongoose.model('user', UserSchema);

module.exports = {User};
