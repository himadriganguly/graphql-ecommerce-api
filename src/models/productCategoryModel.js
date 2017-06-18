'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    productCategorySchema = new Schema({
        categoryName:     { type: String, required: true, unique: true, index: true, },
        categoryImgUrl:   { type: String, default: null, },
        categoryIconUrl:  { type: String, default: null, },
        parentCategoryId: { type: String, default: null, },
        createdAt:        { type: String, required: true, },
        updatedAt:        { type: String, default: null, },
    });

const productCategoryModel = mongoose.model('productcategory', productCategorySchema);

productCategoryModel.on('index', function (err) {
    if (err) {
        console.error(err);
    }
});

module.exports = productCategoryModel;
