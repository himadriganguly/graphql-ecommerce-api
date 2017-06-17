'use strict';

// Import errors
const queryError = require('../../errors/main').queryError;

const UserResolver = {
  RootQuery: {
    me(root, args, context) {
      return {
        fullName: "John Doe",
        address: "711-2880 Nulla St., Mankato Mississippi 96522",
      };
    },
  },
};

module.exports = UserResolver;
