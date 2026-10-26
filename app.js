const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig.js')
const productRoute = require('./Routes/ProductRoute.js');
const userRoute = require('./Routes/UserRoute.js');

dotenv.config(); // Load environmental variable from .env files
connectDB(); // Connect to MongoDB

app.use(express.json()); //Middleware to parse JSON request bodies
app.use('/products', productRoute); // Use the product route for all requests starting with product
app.use('/users', userRoute); // Use the user route for all requests starting with user

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});