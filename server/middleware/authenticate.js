const {User} = require('../models/users');

var authenticate = (req, res, next)=>{
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    console.log(user);
    if(!user){
      return Promise.reject('User not found in database');
    }
    req.user = user;
    req.token = token;
    next();   //call next() since user found without any error
  }).catch((err)=>{
    res.status(401).send({
      errorMessage: 'Something went wrong',
      error: err
    });   //didn't called next since got an error
  });
}

module.exports.authenticate = authenticate;
