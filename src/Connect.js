'use strict';
let endpoints = require('./endpoints');

function Connect(key, secure){
  this.content = new endpoints.content(key, secure);
  this.tags = new endpoints.tags(key, secure);
  this.sections = new endpoints.sections(key, secure);
  this.editions = new endpoints.editions(key, secure);
  this.item = new endpoints.item(key, secure);
  this.custom = new endpoints.custom(key, secure);
}

if (!(typeof exports === 'undefined')) {
    exports.Connect = Connect;
}
