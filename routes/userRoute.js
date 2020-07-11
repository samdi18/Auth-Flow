const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// @route    POST api/user
// @desc     Register user
// @access   Public

router.post('/', userController.registerUser);

module.exports = router;
