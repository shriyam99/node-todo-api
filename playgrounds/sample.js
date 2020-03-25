const jwt = require('jsonwebtoken');
// var data = {
//   id: 4,
//   name: 'henry'
// }
// var token = jwt.sign(data, 'pass').toString();
// var newpromise = new Promise((resolve, reject)=>{
//   resolve('Hello this is a new promise');
// });
//
// newpromise.then((msg)=>{
//   console.log(msg);
//   return token;
// }).then((data)=>{
//   console.log(data);
// })

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true, useUnifiedTopology:true});
var todoSchema = mongoose.Schema({
  text:{
    type: String,
    required: true
  },
  completed:{
    type: Boolean,
    required: true
  },
  completedAt: {
    type: Number,
    default: null
  },
  tokens: [{
      token:{
        type: String,
        default: 'sampletoken'
      }
    }]
});

todoSchema.methods.addtoken = function (){
  var todo= this;
  var data ={
    id: 400,
    name: 'sample'
  };
  var token = jwt.sign(data, 'pass').toString();
  todo.tokens.push({token});
  return todo.save().then(()=>{
    return token;
  })
}

var Todo = mongoose.model('todo', todoSchema);

var newtodo = new Todo({text: 'jumping', completed: false});

newtodo.addtoken()
.then((token)=>{
  console.log(token);
})
.catch((err)=>{
  console.log(err);
});
