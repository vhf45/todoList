/* Multi-line JS Comment */
// JS Comment

// comment

const express = require('express');
const path = require('path');
// set up express
const app = express();

require('dotenv').config();

// set up body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// MONGODB SETUP
const mongoose = require('mongoose')
// const url = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/chapter13apis'

const getUrl = require('./models');
console.log(`url: ${getUrl.url}`);
// const url = process.env.DATABASEURL
//const url = "mongodb://testuser1:Qwerty22.@ds137863.mlab.com:37863/todolist"
// const url = 'mongodb://127.0.0.1:27017/chapter13apis'

mongoose.connect(getUrl.url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', getUrl.url)
})

db.on('error', err => {
  console.error('connection error:', err)
})



// MONGODB NATIVE DRIVER
// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://127.0.0.1:27017'
// const dbName = 'chapter13apis'
// let db

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err)

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
// })





// render static files use the static middleware
// app.use(express.static(__dirname + "../public"));
// app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/public/'));

// gives C:\Users\TMDAV\Desktop\HTML, CSS, JS FILES\nodetest
// console.log(__dirname);

// Below means we don't have to include .ejs filetype on routes
// app.set("view engine", "ejs");

// ROUTES
// require todo routes from routes directory
let todoRoutes = require('./routes/todos')
// set routes from todoRoutes (everything in todos file) to use '/api/todos' prefix
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res){
  // res.render("landing");
  // res.sendFile doesn't work the same way as landing and needs the absolute path from the directory of 
  res.sendFile(path.join(__dirname, './views', "landing.html"));
  // it can also be written as
  // res.sendFile("landing.html", { root: path.join(__dirname, './views') });
});


app.get('/api', function(req, res){
  res.send({name: 'Yoshi'});
});

// listen for requests
// const currentPort = 4000;
// app.listen(process.env.PORT || currentPort, function(){
//   console.log("Server activated - now listening for requests on port: " + process.env.PORT ||currentPort);
// });

// LISTEN ON PORT 3000, REPLACED WITH process.env.PORT, process.env.IP AS ON C9
app.listen(process.env.PORT || 4000, process.env.IP, function(){
  console.log("Server started on port: " + process.env.PORT);
});




// FAKER SETUP
// var faker = require('faker');

// console.log(faker.internet.email());

// MYSQL CONNECTION
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',  // your root username (leave as root)
//   database : 'join_us',   // the name of your db (create this if you haven't already)
//   password : 'Getgoodscrub1.'   // your root user's password
// });





// MYSQL CONNECTION
// var person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past()
// };

// var end_result = connection.query('INSERT INTO users SET ?', person, function(err, result) {
// if (err) throw err;
// console.log(result);
// });

// Select all from table: users
// connection.query('SELECT * FROM users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0]);
// });


// BULK ADD 500 USERS
// var data = [];
// for(var i = 0; i < 500; i++){
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ]);
// }
 
// var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
// connection.query(q, [data], function(err, result) {
//   console.log(err);
//   console.log(result);
// });

// connection.end();

// connection.query('SELECT COUNT(*) AS solution FROM users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// Selecting Query without object by adding .solution to the first value in the results array
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// connection.end();



