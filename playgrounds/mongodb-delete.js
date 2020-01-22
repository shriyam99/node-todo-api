const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
  var db = client.db('TodoApp');
  db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    console.log(res);
  })
  client.close();
})

// MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
//   var db = client.db('TodoApp');
//   db.collection('Todos').insertMany([
//     {
//       task: 'coding',
//       completed: true
//     },
//     {
//       task: 'eat food',
//       completed: true
//     },
//     {
//       task: 'dance practice',
//       completed: false
//     }
//   ], (err, res)=>{
//     console.log(res.ops);
//   });
//   client.close();
// });
