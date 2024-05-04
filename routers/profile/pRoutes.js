const express = require('express');
const route = express.Router();
const upload = require("../../middleware/multer")
const profileController = require('../../controller/profileController');
const { verifyToken } = require('../../middleware/auth.js');

route.get('/' ,verifyToken, profileController.login);
route.post('/register', upload.single("profile-pic"),profileController.registerProfile);




module.exports = route;