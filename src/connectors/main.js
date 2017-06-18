'use strict';

const userAuthMutationConnector = require('./mutation/userAuth');
const productQueryConnector = require('./query/product');

module.exports = {
  userAuthMutationConnector,
  productQueryConnector,
}
