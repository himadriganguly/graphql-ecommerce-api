'use strict';

const createError = require('apollo-errors').createError;

// Mask any internal errors
const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred',
});

// User should be logged in but isn't
const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that',
});

// User is already logged in
const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'You are already authenticated',
});

// User is trying to perform an restricted function
const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do that',
});

// MongoDb duplicate value
const DuplicateValueError = createError('DuplicateValueError', {
  message: 'Duplicate value that is already present.',
});

// Wrong cursor parameter error
const FirstCursorError = createError('FirstCursorError', {
  message: 'Wrong argument in the first cursor.',
});

module.exports = {
  common: {
    UnknownError,
    UnauthorizedError,
    AlreadyAuthenticatedError,
    ForbiddenError,
    DuplicateValueError,
    FirstCursorError,
  },
};
