//contains all the code to run the server
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3000;

const {mongoose}= require('./db/mongoose');
const {todo} = require('./models/todos');
const {user} = require('./models/users');

app.use(bodyparser.json());

app.post('/todos', (req, res)=>{
  console.log(req.body);
  var newtodo = new todo(req.body);
  newtodo.save().then((data)=>{
    res.send(`Database updated with data: ${data}`);
  }).catch((err)=>{
    res.status(400).send(`Something went wrong: ${err}`);
  })
});

app.post('/users', (req, res)=>{
  var newuser = new user(req.body);
  newuser.save().then((data)=>{
    res.send(`Data: ${data}`);
  }).catch((err)=>{
    res.send(`Error: ${err}`);
  });
})

app.listen(PORT, ()=>{
  console.log('App is started');
})
