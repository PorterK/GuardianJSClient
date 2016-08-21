'use strict';
const request = require('request');
const Promise = require('bluebird');

const connect = require('./Connect').Connect;

let testConnection = function(key, secured){
  
  let http = secure ? 'https://' : 'http://';

  let testPromise = Promise.promisify(request.get);

  return testPromise(`${http}content.guardianapis.com/?api-key=${key}`);
}

module.exports = {
  testConnection,
  connect
};
