'use strict';

const request = require('request');

function GuardianJSInvalidMethodException(message) {
  this.message = message;
  this.name = 'GuardianJSInvalidMethodException';
}

function Endpoint(endpoint, key, useSSL, availableFunctions = ['search']) {
  this.endpoint = endpoint;
  this.key = key;
  this.http = useSSL ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`;
  this.availableFunctions = availableFunctions;
  this.request = function (params) {
    return new Promise((resolve, reject) => {
      request.get(params, (err, res, body) => {
        if (err) reject(err);

        resolve({ response: res, body });
      });
    });
  }
}

Endpoint.prototype.search = function (query = null, filters = {}) {
  if (!this.availableFunctions.includes('search')) {
   throw new GuardianJSInvalidMethodException('search is an invalid method'); 
  }

  let filter = '';

  Object.entries(filters).forEach((entry) => {
    const key = entry[0].replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    filter = `${filter}&${key}=${entry[1]}`;
  });

  return this.request(`${this.base}/${this.endpoint}?api-key=${this.key}&q=${query}${filter}`);
}

Endpoint.prototype.getById = function (id) {
  if (!this.availableFunctions.includes('getById')) {
   throw new GuardianJSInvalidMethodException('getById is an invalid method'); 
  }

  return this.request(`${this.base}/${id}?api-key=${this.key}`);
}

exports.endpoint = Endpoint; 