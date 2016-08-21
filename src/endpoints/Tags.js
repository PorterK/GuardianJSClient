'use strict';

const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');

let get = Promise.promisify(request.get);

function Tags(key, secure){
  this.key = key;
  this.secure = secure;
  this.http = secure ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`

}

Tags.prototype.search = function(query, filters){
  let params = filters ? filters : {};

  let filterString = '';

  _.mapKeys(params, function(value, key){
    filterString = filterString + `&${_.kebabCase(key)}=${value}`;
  });

  return get(`${this.base}/tags?api-key=${this.key}&q=${query}${filterString}`);
}

exports.tags = Tags;
