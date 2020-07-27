

let mongoose = require('mongoose');
mongoose.set('debug', true);
const url = "mongodb://testuser1:Qwerty22.@ds137863.mlab.com:37863/todolist";
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = Promise;

// IMPORT model from todo.js
module.exports.Todo = require("./todo");

























