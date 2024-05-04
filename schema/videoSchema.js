const mongoose = require('mongoose');

// Define the schema for the video
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Video model using the videoSchema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
