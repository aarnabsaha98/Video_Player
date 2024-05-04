const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    throw new Error('Cloudinary configuration is incomplete. Please provide all required environment variables.');
}

cloudinary.config({ 
    cloud_name: cloudinaryCloudName, 
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
});

const uploadOnCloudinary = async (localPath) => {
    if (!localPath) {
        throw new Error('No file to upload');
    }

    try {
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });
        console.log('File uploaded on Cloudinary:', response);
        return response;
    } catch (error) {
        // Remove the locally saved temp file if the upload fails
        fs.unlinkSync(localPath);
        throw new Error('Failed to upload file to Cloudinary: ' + error.message);
    }
};

module.exports = uploadOnCloudinary;
