const video = require('../schema/videoSchema');
const profile = require('../schema/profileSchema');
const uploadOnCloudinary = require('../utils/cloudinary');
// const { nanoid } = require('nanoid');


module.exports.postVideos = async (req, res) => {

    try {
        const { title, description, tags } = req.body;
        console.log(title, description);
        const file = req.file
        // Check if the user is authenticated and their information is available in the request
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }

        // Extract user's information from the authenticated request
        const upload_user = req.user.uuid;
        console.log('uploadedBy', upload_user);
        if(!title && !upload_user) {
            return res.status(400).send('uploadedBy, title are required');
        }
        const myProfile = await profile.findOne({  uuid : upload_user });
        console.log('myProfile :' + myProfile)
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        console.log('cloudinaryResponse ++ ', cloudinaryResponse.secure_url)
        // Create profile in the database
        const newUploadVideo = new video({
            title,
            description,
            videoUrl: cloudinaryResponse.secure_url,
            tags,
            uploadedBy : myProfile,
        });
        await newUploadVideo.save();

        res.json({'newUploadVideo : ': newUploadVideo});

    } catch (e) {

        console.error('Error posting video:', e);
        res.status(500).send('Internal Server Error');

    }
}

module.exports.displayAllVideos = async (req, res) => {
    try {
        // Fetch all videos from the database
        const allVideos = await video.find();

        res.json(allVideos); // Send all videos as JSON response
    } catch (error) {
        console.error('Error displaying all videos:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.displayUserSpecificVideos = async (req, res) => {
    try {
        // Check if the user is authenticated and their information is available in the request
        // if (!req.user || !req.user.id) {
        //     return res.status(401).send('User not authenticated');
        // }

        const userId = req.params.userId;

        // Fetch videos uploaded by the specific user
        const userVideos = await video.find({ uploadedBy: userId });

        res.json(userVideos);
    } catch (error) {
        console.error('Error displaying user-specific videos:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.mostLikeVideos = async(req, res )=>{

}
