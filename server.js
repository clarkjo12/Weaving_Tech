const express = require("express");
const path = require("path");
var logger = require('morgan'),
    cors = require('cors')
require('dotenv').config();

const routes = require("./routes");
const mongoose = require("mongoose");

const passport = require('./passport');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(cors())
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'food truck',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wmfa");

const server = app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Socket.io
const io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('user updated favorties', function(truckname){
    console.log("user updated favorties");
    io.emit("favorite updated", truckname);
  });
  socket.on('truck status change', function(){
    console.log("truck status changed");
    io.emit("truck status changed");
  });
  socket.on('trucker updated info', function(){
    console.log("trucker info changed");
    io.emit("truck info changed");
  });
});