const jwt = require('jsonwebtoken');

const { extractBearerToken } = require('../libs/jwt');

const { PRIVATE_KEY } = process.env;

const verifyToken = (req, res, next) => {
  // Get token.
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  // If the token does not exist.
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Error. Need a token',
    });
  }

  // Verify Json Web Token.
  return jwt.verify(
    token,
    PRIVATE_KEY,
    {
      clockTimestamp: Date.now(),
      algorithms: ['HS256'],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: err.message,
        });
      }
      const { iat, exp, ...user } = decoded;

      // If the token is valid
      req.user = user;
      return next();
    },
  );
};

module.exports.verifyToken = verifyToken;
