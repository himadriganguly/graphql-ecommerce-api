'use strict';

// Import all the custom types
const UserProfile = require('./types/user').UserProfile;

const RootQuery = `
  type RootQuery {
    me: UserProfile
  }
`;

module.exports = [
  RootQuery, UserProfile,
];
