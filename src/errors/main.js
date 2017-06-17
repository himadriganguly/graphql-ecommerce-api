'use strict';

const _ = require('lodash');

const userMutationError = require('./mutation/user');
const userQueryError = require('./query/user');
const commonError = require('./common');

const mutationError = _.merge(
  commonError, userMutationError
);
const queryError = _.merge(
  commonError, userQueryError
);

module.exports = {
  queryError,
  mutationError,
}
