const Product = require('../Models/Products.js');

// Create a new product
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// module.exports = { createProduct };

// Another method of creating a product, but this helps us to export direct
exports.createProduct = async (req, res) => {
    try {
        // Check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.colour) {
            res.status(400).json({ message: 'Please provide all required fields' });
        }
        const { name, size, description, price, quantity, colour } = req.body;
        const product = new Product({ name, size, description, price, quantity, colour });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Erorr creating product', error: error.message });
    }
};

// Update a Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Where id is the product id to be updated
        const { name, size, description, price, quantity, colour } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity, colour });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Erorr updating product', error: error.message });
    }
};

// Get a Product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params; // Where id is the product id to be gotten
        const { name, size, description, price, quantity, colour } = req.body;
        const product = await Product.findById(id, { name, size, description, price, quantity, colour });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product gotten successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Erorr getting product', error: error.message });
    }
};

// Get all Product
exports.getProducts = async (req, res) => {
    try {
        const { name, size, description, price, quantity, colour } = req.body;
        const products = await Product({ name, size, description, price, quantity, colour });
        res.status(201).json({ message: 'Products gotten successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Erorr getting products', error: error.message });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Where id is the product id to be deleted
        const { name, size, description, price, quantity, colour } = req.body;
        const product = await Product.findByIdAndDelete(id, { name, size, description, price, quantity, colour });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Erorr deleting product', error: error.message });
    }
};