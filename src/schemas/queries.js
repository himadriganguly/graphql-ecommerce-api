'use strict';

// Import all the custom types
const UserProfile = require('./types/user').UserProfile;
const ProductCategory = require('./types/product').ProductCategory;

const RootQuery = `
  type RootQuery {
    me: UserProfile
    productCategories: [ProductCategory]
  }
`;

module.exports = [
  RootQuery, UserProfile, ProductCategory,
];
