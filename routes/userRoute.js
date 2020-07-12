const express = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

// @route    POST api/user
// @desc     Register user
// @access   Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  userController.registerUser
);

module.exports = router;
