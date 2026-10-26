const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('../Controllers/UserController.js');

// Define the routes
router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);

// Export the router to be used in other files
module.exports = router;