const User = require('../Models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a user
exports.createUser = async (req, res) => {
    try {
        // Request body
        const { name, email, password, gender, HasAdminAccess, phone, role } = req.body;
        // Check if all required fields are provided
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.gender || !req.body.HasAdminAccess || !req.body.phone || !req.body.role) {
            res.status(400).json({ message: 'Please provide all required fields' });
        }
        // Email check
        const existingUser = await User.findOne({ email: req.body.email });
        if(existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Phone number check
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if(existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        // Encrypt password
        const salt = await bcrypt.genSalt(30);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gemder: req.body.gender,
            HasAdminAccess: HasAdminAccess || false, // Default is false if not provided
            phone: req.body.phone,
            role: req.body.role || 'user' // Default role is user not provided
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if all required fields are provided
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide all required fields' })
        }
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password'});
        }
        // Generate a token (you can use jwt or any other method)
        // const token = generateToken(user); // Implement your token generation logic here
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};