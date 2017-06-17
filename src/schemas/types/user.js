'use strict';

const Token = `
  type Token {
    token: String!
  }
`;

const UserRegisterSucess = `
  type UserRegisterSucess {
    success: Boolean!
  }
`;

const UserProfile = `
  type UserProfile {
    fullName: String
    address: String
  }
`;

module.exports = {
  Token,
  UserRegisterSucess,
  UserProfile,
};
