const express = require('express');
const router = express.Router();

//Load input validation
const validateRegisterInput = require('../../validation/register');

//Load user model
const User = require('../../models/User');

//@route   GET request to api/users/test
//@desc    Tests users route
//@access  Public route
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

//@route   POST request to api/users/register
//@desc    Register user
//@access  Public route
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
