
var jwt = require('jsonwebtoken');

module.exports.authenticate = async(req, res) => {
    const userId = req.body.uuid;
    console.log('userName : ', userId);
    const profile = {uuid : userId}
    console.log('profile : ', profile);
    const token = jwt.sign(profile, 'secret_key', { expiresIn: '1h' });
    //res.locals.token = token;
    res.json({token : token});
};
