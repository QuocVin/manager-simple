const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateHash = (plainText, key) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(plainText, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        if (key) {
          return resolve({key, hash});
        }
        return resolve(hash);
      });
    });
  });
};

const compare = async (plainText, hash) => {
  try {
    return await bcrypt.compare(plainText, hash);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateHash,
  compare,
};
