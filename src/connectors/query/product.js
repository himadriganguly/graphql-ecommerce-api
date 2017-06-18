'use strict';

const Promise = require("bluebird");

/*
***************************
    Mongoose Models
***************************
*/
// Subject Model
const ProductCategoryModel = require('../../models/productCategoryModel');

const productCategories = () => {
  return new Promise(function(resolve, reject) {
    ProductCategoryModel.find({}, function(err, results) {
      if(err || results.length === 0) {
        if(results.length === 0) {
          const categoriesNotFoundError = new Error();
          categoriesNotFoundError.name = "categoriesNotFoundError";
          reject(categoriesNotFoundError);
        } else {
          reject(false);
        }
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  productCategories,
}
