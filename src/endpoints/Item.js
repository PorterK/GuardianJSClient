'use strict';

const get = require('../helpers/get');
const _ = require('lodash');

function Item(key, secure){
  this.key = key;
  this.secure = secure;
  this.http = secure ? 'https://' : 'http://';
  this.base = `${this.http}content.guardianapis.com`

}

Item.prototype.search = function(id, filters){
  let params = filters ? filters : {};

  let filterString = '';

  _.mapKeys(params, function(value, key){
    filterString = filterString + `&${_.kebabCase(key)}=${value}`;
  });

  return get(`${this.base}/${id}?api-key=${this.key}${filterString}`);
}

exports.item = Item;
