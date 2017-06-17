'use strict';

// Import GraphQL tools
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

// Import all the query types
const RootQuery = require('./queries');
const RootMutation = require('./mutations');

const Resolvers = require('../resolvers/main');

const rootSchema = `
  schema {
    mutation: RootMutation
    query: RootQuery
  }
`;

const mySchema = makeExecutableSchema({
  typeDefs: [rootSchema, ...RootQuery, ...RootMutation,],
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
});

module.exports = mySchema;
