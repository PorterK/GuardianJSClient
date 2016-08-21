'use strict';

const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');

let get = Promise.promisify(request.get);

function Editions(key, secure){
  this.key = key;
  this.secure = secure;
  this.http = secure ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`

}

Editions.prototype.search = function(query, filters){
  let params = filters ? filters : {};

  let filterString = '';

  _.mapKeys(params, function(value, key){
    filterString = filterString + `&${_.kebabCase(key)}=${value}`;
  });

  return get(`${this.base}/editions?api-key=${this.key}&q=${_.replace(_.lowerCase(query), ' ', '')}${filterString}`);
}

exports.editions = Editions;
