'use strict';

const _ = require('lodash');

const commonError = require('./common');

const userMutationError = require('./mutation/user');
const userQueryError = require('./query/user');
const productQueryError = require('./query/product');

const mutationError = _.merge(
  commonError, userMutationError
);
const queryError = _.merge(
  commonError, userQueryError,
  productQueryError
);

module.exports = {
  queryError,
  mutationError,
}
