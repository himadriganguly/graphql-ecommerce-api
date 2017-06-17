'use strict';

// Required Packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const formatError = require('apollo-errors').formatError;

// Importing GraphQL schemas
const apiSchema = require('../schemas/schema');

// Get our config file
const config = require('../config/appConfig');
// Get the secret key to be used in the JWT Token
const superSecret = config.secret;

// Database Config
const common = require('../config/common');
const dbconfig = common.config();
console.log(dbconfig.MONGO_URI);

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.MONGO_URI, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to Database");
  }
});

// Create Express Application
const app = express();
const server = require('http').Server(app);

// All the helper middleware within an array
const helperMiddleware = [
  (req, res, next) => {
    console.log("Request IP: ", req.connection.remoteAddress);
    next();
  },
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
  },
  bodyParser.json(),
  bodyParser.text({
    type: 'application/graphql',
  }),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = {
        query: req.body,
      };
    }
    next();
  },
  (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && err.hasOwnProperty('body')) {
      console.error('Bad JSON Request');
      res.status(400).json({
        "errors": [{
          "message": "Bad JSON Request",
        }, ],
      });
    }
  },
  expressJWT({
    secret: superSecret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }),
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(403).json({
        "errors": [{
          "message": "You must login to do that",
        }, ],
      });
    }
  },
];

// GraphQl endpoint
app.use('/graphql', helperMiddleware, graphqlExpress(req => ({
  schema: apiSchema,
  context: {
    token: req.user,
  },
  formatError,
  allowUndefinedInResolve: false,
})));

// GraphliQl endpoint
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Starting the server
server.listen(process.env.ECOMMERCE_PORT || 9999, function() {
  console.log('%s: Node server started on http://127.0.0.1:%d ...', Date(Date.now()), process.env.ECOMMERCE_PORT || 9999);
});
