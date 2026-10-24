const mongose = require('mongoose');

const productSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    }
},
{timestamps: true});

// Create model from schema
const Product = mongose.model('Product', productSchema);

module.exports = Product; // Export the model to be used in other files