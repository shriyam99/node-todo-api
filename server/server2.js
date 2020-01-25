const mongoose = require('mongoose');
const {MongoClient, ObjectID} = require("mongodb");
const express = require('express');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(bodyparser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true, useUnifiedTopology: true});
var todo = mongoose.model('todo', {
  text: {
    type: String,
    minlength: 5,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

var user = mongoose.model('user', {
  email: {
    type: String,
    minlength: 3,
    trim: true,
    default: 'abc@email.com'
  }
});


app.post('/todos', (req, res)=>{
  var newtodo = todo(req.body);
  newtodo.save().then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  })
})

app.get('/todos', (req, res)=>{
    todo.find().then((data)=>{
      res.send(data);
    }).catch((err)=>{
      res.send(err);
    })
});
app.post('/users', (req, res)=>{
  var newuser = user(req.body);
  newuser.save().then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  })
})

app.get('/users', (req, res)=>{
    user.find().then((data)=>{
      res.send(data);
    }).catch((err)=>{
      res.send(err);
    })
});

app.listen(PORT, ()=>{
  console.log('Server has started');
});
