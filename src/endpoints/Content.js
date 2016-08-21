'use strict';

const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');

let get = Promise.promisify(request.get);

function Content(key, secure){
  this.key = key;
  this.secure = secure;
  this.http = secure ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`

}

Content.prototype.search = function(query, filters){
  let params = filters ? filters : {};

  let filterString = '';

  _.mapKeys(params, function(value, key){
    filterString = filterString + `&${_.kebabCase(key)}=${value}`;
  });

  return get(`${this.base}/search?api-key=${this.key}&q=${query}${filterString}`);
}

exports.content = Content;
