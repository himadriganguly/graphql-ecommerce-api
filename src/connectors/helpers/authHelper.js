'use strict';

// Required Packages
const CryptoJS   = require("crypto-js");
const jwt = require('jsonwebtoken');

const config = require('../../config/appConfig'); // get our config file
const superSecret = config.secret; // secret variable

/*
***************************
    Mongoose Models
***************************
*/
// Login Model
const LoginModel = require('../../models/loginModel');

// It will generate token after user provide valid credentials
const generateToken = function(emailId, password) {
    return new Promise(function(resolve, reject) {
      LoginModel.findOne({emailId: emailId, password: password,})
        .lean()
        .exec(function(err, result) {
        if (err) {
          reject(err);
        } else if(result) {
          try {
            // Encrypt user id to be passed with JWT token
            const encryptUserlId = CryptoJS.AES.encrypt(result._id.toString(), superSecret).toString();

            // Generate the JWT token
            const token = jwt.sign({
                    iss: "https://example.com",
                    aud: encryptUserlId,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    sub: "Session",
                }, superSecret);

            resolve({token: token,});
          } catch(err) {
            reject(err);
          }
        } else {
          reject(false);
        }
      });
    });
};

// Validate the user token
const validateToken = function(token) {
  if(token) {
    const bytes  = CryptoJS.AES.decrypt(token.aud, superSecret);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } else {
    return false;
  }
}

module.exports = {
  generateToken,
  validateToken,
}
