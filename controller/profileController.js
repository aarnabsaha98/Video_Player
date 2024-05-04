const profile = require('../schema/profileSchema');
const uploadOnCloudinary = require('../utils/cloudinary');
const uuid = require('uuid');

module.exports.login = async (req, res) => {
    try {
        const { name, email } = req.query;

        // Find the profile based on the provided name and email
        const myProfile = await profile.findOne({ name, email });

        if (!myProfile) {
            throw new Error('No profile found');
        }

        const userUUID = req.user.uuid; // Assuming req.user contains UUID
        console.log('user UUID:', userUUID);

        // Find the profile with the provided UUID
        const authenticateProfile = await profile.findOne({ uuid: userUUID });

        if (!authenticateProfile) {
            throw new Error('Authentication failed');
        }

        // Check if the authenticated profile UUID matches the profile found by name and email
        if (authenticateProfile.uuid === myProfile.uuid) {
            console.log('Profile found:', myProfile);
            res.json({ msg: `Login successful for ${myProfile.name}` });
        } else {
            throw new Error('Invalid username or email');
        }
    } catch (error) {
        console.error('Error displaying profile:', error.message);
        res.status(404).send('Profile not found');
    }
};



module.exports.registerProfile = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        const file = req.file;
        console.log('file' + ' ' + file.path);
        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).send('Name, email, and password are required');
        }

        // Check if user already exists (you may uncomment this part)
        const existedUser = await profile.findOne({ $or: [{ name }, { email }] });
        if (existedUser) {
            return res.status(400).send('User already exists');
        }

        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        console.log('cloudinaryResponse ++ ', cloudinaryResponse.secure_url)
        // Create profile in the database
        const newProfile = new profile({
            uuid : uuid.v4(),
            name,
            email,
            password,
            bio,
            profilePicture: cloudinaryResponse.secure_url
        });
        await newProfile.save();

        res.send(newProfile);
    } catch (error) {
        console.error('Error registering profile:', error);
        res.status(500).send('Internal Server Error');
    }
};


