'use strict';

var createError = require('apollo-errors').createError;

// Product categories not found in database
const CategoriesNotFound = createError('CategoriesNotFound', {
  message: 'Product categories not found.',
});

module.exports = {
  product: {
    CategoriesNotFound,
  },
}
