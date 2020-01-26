//contains all the code to run the server
require('./config/config');

const express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var app = express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT;

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

app.get('/users', (req, res)=>{
  user.find().then((users)=>{
    res.status(200).send({users});
  }).catch((err)=>{
    res.status(404).send({
      errorMessage: 'Something went wrong'
    })
  })
})

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
    res.status(400).send({
      errorMessage: 'Id incorrect'
    });
  todo.findById(id).then((todos)=>{
    if(!todos)
      res.status(404).send({
        errorMessage: 'Data not found'
      });
    res.status(200).send({todos});
  }).catch((err)=>{
    res.status(400).send({
      errorMessage: 'Id incorrect'
    });
  })
})

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!id || !ObjectID.isValid(id))
    res.status(404).send({
      errorMessage: 'Id incorrect'
    });
  todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo)
      res.status(404).send({
        errorMessage: 'Data not found'
      });
    res.status(200).send({todo});
  }).catch((err)=>{
    res.status(400).send({
      errorMessage: 'Id incorrect'
    })
  })
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!id || !ObjectID.isValid(id))
    res.status(404).send({
      errorMessage: 'Id incorrect'
    });
  var body = _.pick(req.body, ['text', 'completed']);
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }
  todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo)
      res.status(400).send({
        errorMessage: 'Something went wrong'
      })
    res.status(200).send({todo});
  }).catch((err)=>{
    res.status(400).send({
      errorMessage: 'Something went wrong'
    })
  })
});

app.listen(PORT, ()=>{
  console.log(`App is started on port: ${PORT}`);
})

module.exports = {app};
