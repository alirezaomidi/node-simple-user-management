var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var role = require('./role');
var router = express.Router();


router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
  res.render('register', {});
});

router.post('/register', function (req, res) {
  console.log(req.body);
  Account.register(new Account({
    username: req.body.username,
    fullname: req.body.fullname
  }), req.body.password, function (err, account) {
    if (err) {
      console.log(err);
      return res.render('register', {info: 'Sorry. A user with that email already exists. Try again.'});
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function (req, res) {
  res.render('login', {message: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

router.get('/admins-only', role.requireRole('admin'), function (req, res) {
  res.status(200).send('Welcome Admin!');
});

module.exports = router;