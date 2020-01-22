const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
  var db = client.db('TodoApp');
  db.collection('todos').find({completed: false}).toArray().then((data)=>{
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  })
  client.close();
})
