'use strict';

// Import connectors
const userAuthMutationConnector = require('../../connectors/main').userAuthMutationConnector;

// Import errors
const mutationError = require('../../errors/main').mutationError;

const userResolver = {
  RootMutation: {
    userLogin(_, args) {
      var loginPromise = userAuthMutationConnector.userAuth(args.emailId, args.password);
      return loginPromise.then(function (result) {
        if(result) {
          return result;
        }
      }).catch((err) => {
        if(err.name === "userNotFoundError") {
          throw new mutationError.user.UserNotFoundError();
        } else {
          throw new mutationError.common.UnknownError();
        }
      });
    },
    userSignup(_, args) {
      var userRegisterPromise = userAuthMutationConnector.userRegister(args);
      return userRegisterPromise.then(function(result) {
        if(result) {
          return result;
        }
      }).catch((err) => {
        if(err.name === "duplicationError") {
          throw new mutationError.common.DuplicateValueError();
        } else {
          throw new mutationError.common.UnknownError();
        }
      });
    },
  },
};

module.exports = userResolver;
