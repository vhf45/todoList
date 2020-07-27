
let mongoose = require('mongoose');

// CREATE SCHEMA OF NAME, COMPLETED AND CREATED_DATE
let todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name cannot be blank"
        },
        completed: {
            type: Boolean,
            default: false
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    }
)

// COMPILE SCHEMA INTO MODEL
let Todo = mongoose.model('Todo', todoSchema);

// EXPORT - here we are defining what this module (file) exports. This is what is given to the main app.js/index.js file when you require todo.js (this file)
module.exports = Todo;





















