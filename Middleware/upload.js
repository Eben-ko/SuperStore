const multer = require('multer');
const {Cloudinarystorage} = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');

const storage = new Cloudinarystorage({
    cloudinary: cloudinary,
    params: {
        folder: "superstore",
        allowedFormats: ['jpg, jpeg, png'],
        transformation: [{width: 500, height: 500, crop: "limit"}]
    }
});