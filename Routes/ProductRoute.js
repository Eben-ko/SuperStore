const express = require('express');
const router = express.Router();

// Import the product controller
const productController = require('../Controllers/ProductController.js');

// Define the routes
router.post('/createproduct', productController.createProduct);
router.put('/updateproduct/:id', productController.updateProduct);

// Export the router to be used in other files
module.exports = router;