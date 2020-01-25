const mongoose = require('mongoose');   //importing mongoose
const dbURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;      //to set the promise of global
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});   //connecting to db

module.exports = {mongoose};
