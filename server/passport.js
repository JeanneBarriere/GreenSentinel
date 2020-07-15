const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {usernameField:'mail',
  passwordfield:'password', session: false},
  function(mail, password, done) {
      db.User.findOne({
        mail: mail
      }, function(err, user)
      {
        if (err) {
          return done(err);
        } if (!user) {
          return done(null, false);
        }
        if (user.password != password){
          return done(null, false);
        }
        return done(null, user);
      }).catch(done);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findById(id, function(err, user) {
    cb(err, user);
  });
});

module.exports = router;
