const express = require('express');
const route = express.Router();
const videoController = require('../../controller/videoController');
const upload = require("../../middleware/multer")
const { verifyToken } = require('../../middleware/auth.js');



route.post('/video-upload'  , verifyToken , upload.single('videoUrl'), videoController.postVideos);
route.get('/displayvideos' , videoController.displayAllVideos); 
route.get('/displayvideos/:id' , videoController.displayUserSpecificVideos);


module.exports = route;