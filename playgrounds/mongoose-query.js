const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose.js');
const {todo} = require('../server/models/todos.js');
const {user} = require('../server/models/users.js');

var newid = '5e29aeabfca53e1d88d12194';
var userid = '5e28b2e303f27f21286cab3a';
if(!ObjectID.isValid(newid))
  console.log('ID is not valid');
if(!ObjectID.isValid(userid))
  console.log('ID is not valid');
todo.find({_id: newid}).then((data)=>{
  console.log(data);
}).catch((err)=>{
  console.log(err);
});

todo.findOne({completed: false}).then((data)=>{
  console.log(data);
}).catch((err)=>{
  console.log(err);
});

todo.findById(newid).then((data)=>{
  if(data==null)
    return console.log('data not found');
  console.log(data);
}).catch((err)=>{
  console.log(err);
})

user.findById(userid).then((data)=>{
  if(!data)
    return console.log('User not found');
  console.log(data);
}).catch((err)=>{
  console.log(err);
})
