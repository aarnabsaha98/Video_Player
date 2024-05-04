const express = require('express');
const route = express.Router();
const auth = require('../controller/generateToken');

route.get('/', (req, res) => {
    console.log('App Started');
    res.send('App Started');
});


route.use('/videos' , require('./videos/vRoutes'));
route.use('/music' , require('./videos/vRoutes'));
route.use('/user' , require('./profile/pRoutes'));
route.post('/authenticate', auth.authenticate);


module.exports = route;
