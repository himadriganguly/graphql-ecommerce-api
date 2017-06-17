'use strict';

const createError = require('apollo-errors').createError;

// User not present in database
const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found in database.',
});

module.exports = {
  user: {
    UserNotFoundError,
  },
};
