var express = require('express');
var userRouter = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

// post - logs in users and agent alike
userRouter.route('/login')
  .post((req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user !== null) {
          // decrypting password and checking
          bcrypt.compare(req.body.password, user.password, function (err, response) {
            if (response) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: true, status: 'You have successfully logged in.', userData: user, userId: user.id });
            } else {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: false, status: 'Incorrect credentials.', type: 'incorrect' });
            }
          });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: false, message: 'User not present. Sign up.', type: 'signup' })
        }
      });
  });

// post - signs up users and agent alike
userRouter.route('/signup')
  .post((req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {

          let newUser = new User(req.body);

          // encrypting password and storing to database
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            newUser.password = hash;
            newUser.save()
              .then((userData) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'User successfully registered.', userData })
              });
          });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: false, status: 'User already present.', type: 'duplicate' })
        }
      })
      .catch((err) => next(err));
  });

module.exports = userRouter;