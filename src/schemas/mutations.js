'use strict';

// Import all the custom types
const Token = require('./types/user').Token;
const UserRegisterSucess = require('./types/user').UserRegisterSucess;

const RootMutation = `
  type RootMutation {
    userLogin(
      emailId: String!
      password: String!
    ): Token
    userSignup(
      emailId: String!
      password: String!
      timeStamp: String!
    ): UserRegisterSucess
  }
`;

module.exports = [
  Token, UserRegisterSucess,
  RootMutation,
];
