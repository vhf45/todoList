// JavaScript Comment

let express = require('express');
let router = express.Router();

// we don't need to select file as node will automatically select index.js file from directory
// this will allow us to access the Todo model which was exported to the index
// we can access the model from the db.todo property
let db = require("../models")

// ***********************************************************************************************
// ROUTES
// ***********************************************************************************************
// routes are added as properties to the router variable
// THE ACTUAL ROUTE IS '/api/todos' + [REST OF ROUTE] because of app.use('/api/todos', todoRoutes);

// GET - /api/todos - list all todos 
router.get('/', function(req, res){
    // first we will use find with no args to search all values in the database
    db.Todo.find()
    // we are using a promise so that we only take action after the database query has returned
    // we are not using .render() as we are not returning a html file
    // we are using .json() to return our api data
    .then(function(todos){
        res.json(todos)
    })
    // we have a catch function to tell the user if there has been an error
    .catch(function(err){
        res.send(err)
    })
});

  
// POST - /api/todos - create new todo
router.post('/', function(req, res){
    db.Todo.create(req.body)
    // res.send("POST ROUTE")
    // console.log(req)
    // console.log(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo)
    })
    .catch(function(err){
        res.send(err)
    })
});

// GET - /api/todos/:todoId - get a specific todo
router.get('/:todoId', function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err)
    })
});

// PUT - /api/todos/:todoId - update a todo
router.put('/:todoId', function(req, res){
    // search for _id where _id is equal to the parameter todoId
    // {new: true} will return the updated value
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo)
    })
    .catch(function(err){
        res.send(err)
    })
});

// DELETE - /api/todos/:todoId - delete a todo
router.delete('/:todoId', function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({
            message: "We deleted it"
        })
    })
    .catch(function(err){
        res.send(err)
    })
});



module.exports = router;


















