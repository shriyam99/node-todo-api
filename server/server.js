//contains all the code to run the server

const mongoose = require('mongoose');   //importing mongoose

mongoose.Promise = global.Promise;      //to set the promise of global
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true, useUnifiedTopology: true});   //connecting to db

// var todo = mongoose.model('Todo', ({     //creating a model
//   text: {
//     type: String,    // we can set properties like required and type etc..
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// }));
//
// var newtodo = new todo({text: '   skating    '});   //creating instance of model
// newtodo.save().then((data)=>{     //.save() returns promise which we have set above
//   console.log(data);
// }).catch((err)=>{
//   console.log(err);
// });

var user = mongoose.model('user', new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    default: 'abc123@email.com'
  },
}));

var newuser = new user({email: '   josephpristely@gmail.com  '});
newuser.save().then((data)=>{
  console.log(data);
}).catch((err)=>{
  console.log(err);
});
