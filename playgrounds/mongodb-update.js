const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
  var db = client.db('TodoApp');
  db.collection('Users').findOneAndUpdate({_id: new ObjectID('5e246612ba1ee627c4f3b0ed')},
  {$inc: {age: 2},
  $set: {hobbies : [
        "driving",
        "racing"
    ]}
  },
  {returnOriginal: false})
  .then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
  client.close();
});
