'use strict';

// Import Connectors
const productQueryConnector = require('../../connectors/main').productQueryConnector;

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
    productCategories(root, args, context) {
      const productCategoriesPromise = productQueryConnector.productCategories();
      return productCategoriesPromise.then(function(results) {
        return results;
      }).catch((err) => {
        if(err.name === "categoriesNotFoundError") {
          console.log(err);
          throw new queryError.product.CategoriesNotFound();
        } else {
          throw new queryError.common.UnknownError();
        }
      });
    },
  },
};

module.exports = UserResolver;
