

let mongoose = require('mongoose');
mongoose.set('debug', true);
const url = 'mongodb://127.0.0.1:27017/chapter13apis';
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = Promise;

// IMPORT model from todo.js
module.exports.Todo = require("./todo");

























