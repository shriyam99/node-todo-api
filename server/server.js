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
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');

app.use(bodyparser.json());


app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var newuser = new User(body);
  newuser.save().then(()=>{
    return newuser.getAuthToken();
  }).then((token)=>{
    res.status(200).header('x-auth', token).send(newuser);
  }).catch((err)=>{
    res.status(400).send({
      errorMessage: 'Something went wrong',
      error: err
    });
  });
});

app.get('/users/me', authenticate, (req, res)=>{
  res.status(200).send(req.user);   //user will be verified by middleware
});

app.delete('/users/me/token', authenticate, (req, res)=>{
  req.user.deleteToken(req.token).then(()=>{
    res.status(200).json({
      msg: 'User logged out. Token got deleted!!'
    });
  }).catch((err)=>{
    res.status(401).json({
      err,
      errorMessage: 'Something went wrong'
    })
  })
});

app.post('/users/login', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.getAuthToken().then((token)=>{
      res.status(200).header('x-auth', token).send(user);
    });
  }).catch((err)=>{
    res.status(401).json({
      errorMessage: 'Something went wrong',
      err: err
    })
  });
})

app.post('/todos', authenticate, (req, res)=>{
  console.log(req.body);
  var newtodo = new todo({
    text: req.body.text,
    _creator: req.user._id
  });
  newtodo.save().then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.status(400).send(err);
  })
});

app.get('/todos', authenticate, (req, res)=>{
  todo.find({_creator: req.user._id}).then((todos)=>{
    if(todos.length===0)
      res.status(400).send({
        errorMessage: 'Data not found'
      });
    res.status(200).send({todos});
  }).catch((err)=>{
    res.status(400).send(err);
  })
})

app.get('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  if(!id || !ObjectID.isValid(id))
    res.status(400).send({
      errorMessage: 'Id incorrect'
    });
  todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todos)=>{
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

app.delete('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  if(!id || !ObjectID.isValid(id))
    res.status(404).send({
      errorMessage: 'Id incorrect'
    });
  todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo)=>{
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

app.patch('/todos/:id',authenticate, (req, res)=>{
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
  todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo)=>{
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
