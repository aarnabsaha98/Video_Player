const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({


    uuid:{
        type: 'string',
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
        
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
