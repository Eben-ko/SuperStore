const express = require('express');
const router = express.Router();
// Import authentication middleware 
const { protect } = require('../Middleware/auth.js');
// Import authorization middleware
const { authorize } = require('../Middleware/role.js');

// Import the product controller
const productController = require('../Controllers/ProductController.js');

// Define the routes
router.post('/createproduct', protect, authorize('superadmin'), productController.createProduct);
router.put('/updateproduct/:id', protect, authorize('storekeeper'), productController.updateProduct);

router.get('/getproduct/:id', protect, productController.getProduct);
router.get('/getproducts', protect, productController.getProducts);
router.delete('/deleteproduct/:id', protect, productController.deleteProduct);

// Export the router to be used in other files
module.exports = router;