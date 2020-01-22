// const {MongoClient, ObjectID} = require('mongodb');
//
// MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
//   console.log('Logged in to mongo servers');
//   var db = client.db('TodoApp');
//   db.collection('Users').find({_id: new ObjectID('5e246612ba1ee627c4f3b0ed')}).toArray().then((data)=>{
//     console.log(`Data: ${JSON.stringify(data, undefined, 2)}`);
//   }).catch((err)=>console.log(`Error: ${err}`));
//   client.close();
// });

// const {MongoClient, ObjectID} = require('mongodb');
//
// MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
//   if(err)
//     console.log(err);
//   var db = client.db('TodoApp');
//   db.collection('Users').find({name: 'rahul sharma'}).toArray().then((data)=>{
//     console.log(data);
//   }).catch((err)=>{
//     console.log(err);
//   })
//   client.close();
// });

// const {MongoClient, ObjectID} = require('mongodb');
// MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
//   var db = client.db('TodoApp');
//   db.collection('Users').find({age: 44}).count().then((count)=>{
//     console.log(`Total count: ${count}`);
//   }).catch((err)=>console.log(err));
//   client.close();
// })

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
  console.log(err);
  var db = client.db('TodoApp');
  db.collection('Users').find().toArray().then((data)=>{
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  });
  client.close();
}
);
