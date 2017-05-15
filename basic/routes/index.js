var express = require('express');
var passport = require('passport');
var router = express.Router();

var array = [ "awsID_1", "awsID_2"]

function EC2_Instance(id, name, status, location) {
  this.id = id
  this.name = name
  this.active = status;
  this.location = location;
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('loginMessage') });
});

router.get('/profile', isLoggedIn, function(req, res) {
  var instances = [new EC2_Instance("awsID_1", "CSNet Instance SJSU", "Active", "West"),
  new EC2_Instance("awsID_2", "CSNet Instance UCSC", "Inactive", "East") ]
  //res.render('profile.ejs', { user: req.user });
  res.render('profile.ejs', { user: instances});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));


module.exports = router;


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}