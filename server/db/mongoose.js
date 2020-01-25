const mongoose = require('mongoose');   //importing mongoose

mongoose.Promise = global.Promise;      //to set the promise of global
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true, useUnifiedTopology: true});   //connecting to db
// mongoose.connect('mongodb+srv://shriyam:herokusample@cluster0-k8dbj.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});   //connecting to db

module.exports = {mongoose};
