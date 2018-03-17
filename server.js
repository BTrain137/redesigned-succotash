const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();

// Configure body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Mongo connection
require("./db/config")

//query database
const db = require('./db/db.js');

// Serve up static assets (usually on heroku)
// Local instance must be yarn build before every test
app.use(express.static("client/build"));

//socket needs a server to listen
server = app.listen(PORT, function() {
  console.log(`http://localhost:${PORT}!`);
});

var io = require("socket.io")(server);

//socket will keep a connection open when the route is hit
//must be be the same port as the Server
io.on("connection", socket => {
  console.log("User connected");

  //TODO fix function so that database is called only once
  //this function calls everytime a new user hits socket
  //possible single API call at a different route
  // db.findAll(function(data){

  //   data.forEach(datum => {
  //     // console.log(datum)
  //     io.emit("RECEIVE_MESSAGE", datum);  
  //   });

  // })

  //One when a user sends a message
  socket.on("SEND_MESSAGE", function(data) {  

    //database records each message from all users
    db.create(data, function(callback){
      // console.log(callback)
      
      //message passes back as a call back 
      io.emit("RECEIVE_MESSAGE", callback);
    });
    
  });

  //socket also listens to when user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});