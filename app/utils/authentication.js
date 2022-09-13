const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../../config/authenticationConfig");

exports.genSalt = async size => {
  return await bcrypt.genSalt(size);
}
exports.hash = async (salt, password) => {
  console.log(salt)
  return await bcrypt.hash(password, salt);
};

exports.generateSessionToken = async (
  reqBodyPassword,
  userPasswordToken,
  tokenQuery
) => {
  try {
    tokenQuery = tokenQuery || {};
    let result = await bcrypt.compare(reqBodyPassword, userPasswordToken);
    if (result) {
      const token = jwt.sign(tokenQuery, JWT_KEY, {
        expiresIn: "3h",
      });
      return token;
    } else {
      let error = new Error("Wrong Password");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    throw error
  }
};
