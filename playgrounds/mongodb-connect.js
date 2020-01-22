// const MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');
var id = new ObjectID();
console.log(id);

// MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
//   if(err)
//     return console.log("Error", err);
//   console.log('Connected successfully!!');
//   var db = client.db('TodoApp');
//   db.collection('Users').insertOne({
//     name: 'aurthor',
//     age: 48,
//   }, (err, res)=>{
//     if(err)
//       return console.log(err);
//     console.log(res.ops[0].timeStamp());
//   });
//   client.close();
// });
//
// var obj = {name: 'shriyam tripathi', age: 20};
// var {name} = obj;
// console.log(name);
