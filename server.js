const express = require("express");
const path = require("path");
require('dotenv').config();

const routes = require("./routes");
const mongoose = require("mongoose");

const passport = require('./passport');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wmfa");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// require("./notifyCustomers")()