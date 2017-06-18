'use strict';

const _ = require('lodash');

const mutationResolver = require('./mutation/mutation');
const queryResolver = require('./query/query');

const resolvers = _.merge(
    queryResolver,
    mutationResolver
  );

module.exports = resolvers;
