const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashPassword = async (password) => {
  //put async because this funftion is a promise
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        resolve({ salt, hash }); // sent hash and salt as object
      });
    });
  });
};

const comparePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    let result = bcrypt.compare(password, hashPassword);
    if (result) {
      resolve(result);
    } else {
      reject;
    }
  });
};

const generateOtp = (num) => {
  if (num < 2) {
    return Math.floor(1000 + Math.random() * 9000);
  }
  const c = Math.pow(10, num - 1);
  return Math.floor(c + Math.random() * 9 * c);
};

const validatePhone = (phone) => {
  if (!phone) throw error;
  const userPhone = phone.trim();
  const firstCh = userPhone.charAt(0);
  if (firstCh === "+" && userPhone.length === 14) {
    return userPhone;
  } else if (firstCh === "0" && userPhone.length === 11) {
    return `+234${userPhone.slice(1)}`;
  } else if (firstCh === "2" && userPhone === 14) {
    `+${userPhone}`;
  } else {
    return false;
  }
};
module.exports = { hashPassword, comparePassword, generateOtp, validatePhone };
