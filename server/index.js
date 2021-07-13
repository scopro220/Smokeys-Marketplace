const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require('passport');
var session = require('express-session');
require('./passport.js');
const { Users, Item, Transaction } = require("../database");
const {
  transactions,
  users,
  ratingsReviews } = require("../routes");

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", () => console.log(`Connected to Smokey's DB`));

app.use(
  session({
    secret: 'password',
    resave: true,
    saveUninitialized: true,
  })
);

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

let port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/../dist"));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


app.route('/user/')
  .post(users.createNewUser)

app.route('/user/:id')
  .get(users.getUserInfo)
  .put(users.updateUserInfo)

app
  .route("/transactions/")
  .get(transactions.getTransactions)
  .post(transactions.addTransaction);

app
  .route("/transactions/:transaction_id/complete")
  .put(transactions.completeTransaction);

app
  .route("/transactions/:transaction_id/cancel")
  .put(transactions.cancelTransaction);

app.route("/reviews/:user_id")
  .get(ratingsReviews.getReviews)
  .post(ratingsReviews.addReview);


//Route to send client when user is found in the DB
// app.get('http://localhost:4000/good', isLoggedIn, (req, res) => res.redirect('http://localhost:4000/user'))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    req.user.isUser ? res.redirect('/user') : res.redirect('/user')
  }
);

app.get('/getUser', isLoggedIn, (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

// This needs to be last route!
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});