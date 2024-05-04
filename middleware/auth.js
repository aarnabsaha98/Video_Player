// const profile = require('../schema/profileSchema')
const jwt = require('jsonwebtoken');

// Function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization; 
  console.log('token :' + token);

  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  const parts = token.split(' '); // Splitting 'Authorization' header value (e.g., 'Bearer token')
  console.log('parts :: ' + parts);
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).send('Unauthorized: Invalid token format');
  }

  jwt.verify(parts[1], 'secret_key', (err, profile) => {
    if (err) {
        console.log('error :' + err);
      return res.status(401).send('Unauthorized: Invalid token');
    } else {
        console.log('decoded :' + JSON.stringify(profile));
        req.user = profile;
    }
    next();
  });
}

module.exports = { verifyToken };
