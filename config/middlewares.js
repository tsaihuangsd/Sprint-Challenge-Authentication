const jwt = require('jsonwebtoken');

//import secret key for authentication
const jwtKey = require('../_secrets/keys').jwtKey;

// export middleware
module.exports = {
  authenticate
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
      //verify if token was encrypted from the secret key
      jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {  
          return res.status(401).json(err)
        } else {
          req.decoded = decoded;
          next();
        }
      });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
