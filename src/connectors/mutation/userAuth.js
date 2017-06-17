'use strict';

const Promise = require("bluebird");
const jwt = require('jsonwebtoken');
const async = require('async');
const _ = require('lodash');

const authHelper = require('../helpers/authHelper');

/*
***************************
    Mongoose Models
***************************
*/
// Login model
const LoginModel = require('../../models/loginModel');

// Register user credentials to the database
const userRegister = function(userDetails) {
  return new Promise(function (resolve, reject) {
    var loginDetail = new LoginModel({
      emailId: userDetails.emailId,
      password: userDetails.password,
      createdAt: userDetails.timeStamp,
    });

    loginDetail.save(function(err, result) {
      if(err) {
        if(err.name === 'MongoError' && err.code === 11000) {
          const duplicationError = new Error();
          duplicationError.name = "duplicationError";
          reject(duplicationError);
        } else {
          const unknownError = new Error();
          unknownError.name = "unknownError";
          reject(unknownError);
        }
      } else {
        resolve({success: true,});
      }
    });
  });
};

// Verify user credentials with the stored credentials
const userAuth = function(emailId, password) {
  return new Promise(function (resolve, reject) {
    var tokenGenPromise = authHelper.generateToken(emailId, password);
    tokenGenPromise.then(function(result) {
      if(result) {
        resolve(result);
      }
    }).catch((err) => {
      if(err === false) {
        const userNotFoundError = new Error();
        userNotFoundError.name = "userNotFoundError";
        reject(userNotFoundError);
      } else {
        const unknownError = new Error();
        unknownError.name = "unknownError";
        reject(unknownError);
      }
    });
  });
};

module.exports = {
  userAuth,
  userRegister,
};
