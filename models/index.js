

let mongoose = require('mongoose');
mongoose.set('debug', true);
const url = "mongodb://testuser1:Qwerty22.@ds137863.mlab.com:37863/todolist" || 'mongodb://127.0.0.1:27017/chapter13apis';
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = Promise;

// IMPORT model from todo.js
module.exports.Todo = require("./todo");

// export url to app.js
exports.url = url;























