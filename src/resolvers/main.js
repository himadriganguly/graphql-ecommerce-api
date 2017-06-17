'use strict';

const _ = require('lodash');

const userMutationResolver = require('./mutation/user');
const userQueryResolver = require('./query/user');

const resolvers = _.merge(
    userQueryResolver,
    userMutationResolver
  );

module.exports = resolvers;
