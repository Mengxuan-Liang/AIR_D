// This file will hold the resources for the route paths beginning with /api/users
const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();


// middleware for validating sign up
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      // check if user provided email, username, firstname and lastname
      const err = new Error("Bad Request");
      err.status(400);
      err.errors = {};
      if(!email){
        err.errors.email = "Invalid email"
      }
      if(!username){
        err.errors.username = "Username is required"
      }
      if(!firstName){
        err.errors.firstName = "First Name is required"
      }
      if(!lastName){
        err.errors.lastName = "Last Name is required"
      }

      if((Object.keys(err.errors)).length) throw err;
      // check if user with the email already exists
      const allUsers = await User.findAll();
      const existingEmail = allUsers.find(user => user.email === email);
      if(existingEmail){
        return res.status(500).json({
          message: "User already exists",
          errors: {
            email: "User with that email already exists"
          }
        })
      }
      //check if user with the username already exists
      const existingUsername = allUsers.find(user => user.username === username);
      if(existingUsername){
        return res.status(500).json({
          message: "User already exists",
          errors: {
            email: "User with that username already exists"
          }
        })
      }
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );


module.exports = router;