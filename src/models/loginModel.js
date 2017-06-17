'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    loginSchema = new Schema({
        emailId:        { type: String, required: true, unique: true, index: true, },
        password:       { type: String, required: true, },
        createdAt:      { type: String, required: true, },
        updatedAt:      { type: String, default: null, },
    });

const loginModel = mongoose.model('login', loginSchema);

loginModel.on('index', function (err) {
    if (err) {
        console.error(err);
    }
});

module.exports = loginModel;
