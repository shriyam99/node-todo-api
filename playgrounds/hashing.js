const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'herokusampleapp'
// bcrypt.genSalt(11, (err, salt)=>{
//   bcrypt.hash(password, salt, (err, hash)=>{
//     console.log(hash);
//   })
// })

var hashedpassword= '$2a$11$I/fmiDinIIMccGFNqYLf7eVxH.HlmNpVXVcIokpOm9zy8WpGoIlmC';
bcrypt.compare(password, hashedpassword, (err, res)=>{
  console.log(res);
})
// var data = {
//   id: 4
// };
// var token = jwt.sign(data, 'saitama');
// console.log(token);
//
// var result = jwt.verify(token, 'saitama');
// console.log('Result: ', result);

// var message = 'i am number 3';
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
//
// var data = {
//   id: 4
// }
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data)+'saitama').toString()
// }
//
// token.data = {
//   id: 5
// };
//
// token.hash= SHA256(JSON.stringify(token.data)).toString();
//
// var resulthash = SHA256(JSON.stringify(token.data)+'saitama').toString();
//
// if(token.hash===resulthash){
//   console.log("Data isn't altered");
// }
// else {
//   console.log("Data is altered");
// }
