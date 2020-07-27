/* Multi-line JS Comment */
// JS Comment

// alert("JS file loading correctly")
// $("p").css("background-color", "yellow");


$(document).ready(function(){

    // *********************************************************************
    // REQUESTS - GET ALL
    // *********************************************************************

    $.getJSON("/api/todos")
    // .then(function(data){
    //     console.log(data)
    // })
    
    // why does addTodosToPage not have () to call it?
    // ANSWER = Event handling functions (callbacks) are automatically called by the browser, so you can't supply arguments to them
    // you only need to reference a function for .then() and other functions like .addEventListener()
    .then(console.log("addTodosToPage: " + addTodosToPage))
    .then(addTodosToPage)
    .done(function(data){
      $("#quote").html(data);
    })
    .fail(function(){
      console.log("ERROR!");
    });
    
    function addTodosToPage(todos){
        
        todos.forEach(function(todo){
          console.log(todo.name)
          // create list item
          let createListItem = $('<li class="task">' + todo.name + todo.completed + '<span>X</span></li>');
          // store value of id of each list member
          createListItem.data('id', todo._id)
          // store value of completed status of each list member
          createListItem.data('completed', todo.completed)
          if(todo.completed){
            createListItem.addClass("done")
          }
          // append list item to ul unordered list
          $('.list').append(createListItem)
        })
    }
    // *********************************************************************
    // CREATE NEW
    // *********************************************************************
    $('#todoInput').keypress(function(event){
      // 13 is code for enter key
      if(event.which == 13){
        // create todo
        console.log("enter clicked")
        createTodo();
      }
    })
    function createTodo(){
      // get content from input
      var currentTextInput = $('#todoInput').val()
      // send post request to /api/todos
      $.post("/api/todos", {
        name: currentTextInput
      })
      // we receive the newly created toDo back so can deal with it here
      .then(function(newTodo){
          console.log(newTodo)
          let createNewItem = $('<li class="task">' + newTodo.name + newTodo.completed + '<span>X</span></li>');
          if(newTodo.completed){
            createNewItem.addClass("done")
          }
          // append list item to ul unordered list
          $('.list').append(createNewItem)
          // clear input box of text
          $('#todoInput').val('')
      })
      .catch(function(error){
          console.log(error)
      })
    }
    // *********************************************************************
    // DELETE
    // *********************************************************************

    // select all delete buttons
    // add button event listeners
    // can't select span directly as not loaded in time
    // $('span').on('click', function(){
    // list is on page when it loads
    $('.list').on('click', 'span', function(e){
      // e.stopPropagation() stops this listener activating the updated completion listener
      e.stopPropagation();
      // 'this' refers to the span object in the below context
      var clickedItem = $(this).parent().data('id')
      console.log("clickety click")
      $(this).parent().remove()
      $.ajax({
        url: '/api/todos/' + clickedItem,
        method: 'DELETE'
      })
      .then(function(data){
        console.log(data)
      })
    // get todo IDs that corresponds to each button
    // todo.data('id', 1)
    // add delete ajax request
    });

    // *********************************************************************
    // UPDATE - combo of finding right id to update, then 
    // *********************************************************************
    
    // select span text and add event listener
    $('.list').on('click', 'li', function(){
      updateTodo($(this))
      })
      // newly updated todo is returned

    
    function updateTodo (updateItem){
      var clickedItem = updateItem.data('id')
      console.log(clickedItem)
      // toggle completed true / false boolean
      var isDone = !updateItem.data('completed')
      console.log(isDone)
      // sets completed to be opposite of current boolean
      var updateData = {completed: isDone}
      console.log(updateData)
      $.ajax({
        url: '/api/todos/' + clickedItem,
        method: 'PUT',
        data: updateData
      })
      .then(function(updatedTodo){
        console.log(updatedTodo);
        // change class to strikethrough text
        updateItem.toggleClass("done");
        // change value of .data() field that we are using
        updateItem.data("completed", isDone);
      })


    }      
})


// window.onload=function(){}








