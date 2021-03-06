'use strict';

const ProductCategory = `
  type ProductCategory {
    categoryName: String
    categoryImgUrl: String
    categoryIconUrl: String
    parentCategoryId: String
    createdAt: String
    updatedAt: String
  }
`;

module.exports = {
  ProductCategory,
};
