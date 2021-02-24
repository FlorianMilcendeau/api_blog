const jwt = require('jsonwebtoken');

/** Read private key */
const { PRIVATE_KEY } = process.env;

/** Generate Json Web Token
 *
 * @param {object} user
 * @returns {{token: string, expiresIn: number}} Json Web Token and his expiration.
 */
const generateToken = (user) => {
  const { id, name, email } = user;

  // Init payload
  const payload = {
    sub: id,
    name,
    email,
    iat: Date.now(),
  };

  // 5 min
  const expiresIn = 1000 * 60 * 5;

  // token generated and singed.
  const signedToken = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: 'HS256',
  });

  return {
    expiresIn,
    token: `Bearer ${signedToken}`,
  };
};

/** Extraction of the Json Web Token
 *
 * @param {string} headerValue
 * @returns {(false|string)} False if not a string, otherwise the token.
 */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== 'string') {
    return false;
  }

  // Extract the "bearer" from the token..
  const matches = headerValue.match(/(Bearer)\s+(\S+)/i);

  return matches && matches[2];
};

module.exports.generateToken = generateToken;
module.exports.extractBearerToken = extractBearerToken;
