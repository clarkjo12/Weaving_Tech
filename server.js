const express = require("express");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

const routes = require("./routes");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("./passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "food-truck", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false //required
  })
);

app.use((req, res, next) => {
  console.log("req.session", req.session);
  return next();
});

app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// Define API routes here
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wmfa");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
