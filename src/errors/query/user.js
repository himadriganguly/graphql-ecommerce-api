'use strict';

var createError = require('apollo-errors').createError;

// User details not found in database
const UserDetailsError = createError('UserDetailsError', {
  message: 'User profile details not found.',
});

module.exports = {
  user: {
    UserDetailsError,
  },
}
