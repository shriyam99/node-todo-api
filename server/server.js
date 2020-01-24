//contains all the code to run the server
const express = require('express');
const {ObjectID} = require('mongodb');
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
    res.send(data);
  }).catch((err)=>{
    res.status(400).send(err);
  })
});

app.post('/users', (req, res)=>{
  var newuser = new user(req.body);
  newuser.save().then((data)=>{
    res.send(`Data: ${data}`);
  }).catch((err)=>{
    res.send(`Error: ${err}`);
  });
});

app.get('/todos', (req, res)=>{
  todo.find().then((todos)=>{
    if(todos.length===0)
      res.status(400).send({
        errorMessage: 'Data not found'
      });
    res.status(200).send({todos});
  }).catch((err)=>{
    res.status(400).send(err);
  })
})

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!id || !ObjectID.isValid(id))
    res.status(404).send({
      errorMessage: 'Id incorrect'
    });
  todo.findById(id).then((todos)=>{
    if(!todos)
      res.status(404).send({
        errorMessage: 'Data not found'
      });
    res.status(200).send({todos});
  }).catch((err)=>{
    res.status(404).send({
      errorMessage: 'Id incorrect'
    });
  })
})

app.listen(PORT, ()=>{
  console.log('App is started');
})

module.exports = {app};
