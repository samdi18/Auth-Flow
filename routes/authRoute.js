const express = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET api/auth
// @desc     Get user by token
// @access   Private

router.get('/', auth, authController.getUserByToken);

// @route    POST api/auth
// @desc     Authenticate user & get token of user
// @access   Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  authController.loginUser
);

module.exports = router;
