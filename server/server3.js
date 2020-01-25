const mongoose = require('mongoose');
const express = require('express');
var app = express();
const PORT =process.env.PORT || 3000;

var db = process.env.MONGODB_URL || 'mongodb://localhost:27017';

mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var user = mongoose.model('user', {
  text: {
    type: String,
    minlength: 4
  },
  comlpeted: {
    type: Boolean,
    default: false
  }
});

var newuser = new user({
  text: 'new text here',
  completed: true
});

app.get('/', (req, res)=>{
  newuser.save().then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  })
});

app.listen(PORT, ()=>{
  console.log(`App started on port: ${PORT}`);
})
