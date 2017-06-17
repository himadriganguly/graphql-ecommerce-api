'use strict';

var env = require('./db.json');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'default';
  return env[node_env];
};
