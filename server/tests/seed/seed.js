const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {todo} = require('./../../models/todos.js');
const {User} = require('./../../models/users.js');
const secret = process.env.JWT_SECRET;

const useroneid = new ObjectID();
const usertwoid = new ObjectID();
const loadUserData = [
  {
    _id: useroneid,
    email: 'sample123@gmail.com',
    password: 'user1pass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: useroneid, access: 'auth'}, secret).toString()
    }]
  },
  {
    _id: usertwoid,
    email: 'anothersample123@gmail.com',
    password: 'user2pass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: usertwoid, access: 'auth'}, secret).toString()
    }]
  }
];

const loadTodoData =  [{
  _id: new ObjectID(),
  text: 'first test case',
  _creator: useroneid
}, {
  _id: new ObjectID(),
  text: 'Second test case',
  completed: true,
  completedAt: 23423,
  _creator: usertwoid
}];


const populateTodos = (done) => {                    //mocha function runs before testing application
  todo.remove({}).then(()=>{
    todo.insertMany(loadTodoData).then(()=>done());
  });
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userone = new User(loadUserData[0]).save();
    var usertwo = new User(loadUserData[1]).save();
    return Promise.all([userone, usertwo]); //it resolves all promises in one go
  }).then(()=>done());
};

module.exports = {loadTodoData, loadUserData, populateTodos, populateUsers};
