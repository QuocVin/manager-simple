const jwt = require("jsonwebtoken");
const secretKey = "shiseido-secret-key";
const signOptions = {
  algorithm: "HS256",
  expiresIn: "8h",
};
const refreshOptions = {
  algorithm: "HS384",
  expiresIn: "24h",
};
// "algorithm" must be a valid string enum value

const generateToken = (data, isRefresh = false) => {
  return new Promise((resolve, reject) => {
    const options = isRefresh ? refreshOptions : signOptions;
    jwt.sign(data, secretKey, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject("Token is undefined.");
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
