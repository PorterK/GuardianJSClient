'use strict';
let Endpoint = require('./Endpoint').endpoint;

function Connect(key, secure){
  this.content = new Endpoint('search', key, secure);
  this.tags = new Endpoint('tags', key, secure);
  this.sections = new Endpoint('sections', key, secure);
  this.editions = new Endpoint('editions', key, secure);
  this.item = new Endpoint(null, key, secure, ['getById']);
}

if (!(typeof exports === 'undefined')) {
    exports.Connect = Connect;
}
