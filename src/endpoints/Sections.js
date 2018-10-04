'use strict';

const get = require('../helpers/get');
const _ = require('lodash');

function Sections(key, secure){
  this.key = key;
  this.secure = secure;
  this.http = secure ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`

}

Sections.prototype.search = function(query, filters){
  let params = filters ? filters : {};

  let filterString = '';

  _.mapKeys(params, function(value, key){
    filterString = filterString + `&${_.kebabCase(key)}=${value}`;
  });

  return get(`${this.base}/sections?api-key=${this.key}&q=${query}${filterString}`);
}

exports.sections = Sections;
