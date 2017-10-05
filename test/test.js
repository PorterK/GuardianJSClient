'use strict';
const expect = require('expect');
const guardian = require('../src');
const _ = require('lodash');
let api = new guardian('test', false);


describe('Connection', function(){
  it('should return OK', function(){
    api.content.search()
      .then(function(response){
        expect(response.statusCode).toBe(200);
      })
  })
});

describe('Content', function(){
  it('has a search function that returns OK', function(){
    api.content.search()
      .then(function(response){
        expect(response.statusCode).toBe(200);
      });
  });

  it('properly parses filters', function(){
    api.content.search('football', {
      starRating: 3
    })
      .then(function(response){
        expect(_.includes(response.req._header, 'star-rating'));
      })
  });

  it('actually returns content', function(){
    api.content.search('football')
      .then(function(r){
        expect(JSON.parse(r.body).response.results.length).toBeGreaterThan(0);
      })
  });

});

describe('Tags', function(){
  it('has a search function that returns OK', function(){
    api.tags.search()
      .then(function(response){
        expect(response.statusCode).toBe(200);
      });
  });

  it('properly parses filters', function(){
    api.tags.search('football', {
      pageSize: 3
    })
      .then(function(response){
        expect(_.includes(response.req._header, 'page-size'));
      })
  });

  it('actually returns content', function(){
    api.tags.search('sport')
      .then(function(r){
        expect(JSON.parse(r.body).response.results.length).toBeGreaterThan(0);
      })
  });
});

describe('Sections', function(){
  it('has a search function that returns OK', function(){
    api.sections.search()
      .then(function(response){
        expect(response.statusCode).toBe(200);
      });
  });

  it('actually returns content', function(){
    api.tags.search('world')
      .then(function(r){
        expect(JSON.parse(r.body).response.results.length).toBeGreaterThan(0);
      })
  });
});

describe('Editions', function(){
  it('has a search function that returns OK', function(){
    api.editions.search()
      .then(function(response){
        expect(response.statusCode).toBe(200);
      });
  });

  it('actually returns content', function(){
    api.editions.search('u')
      .then(function(r){
        expect(JSON.parse(r.body).response.results.length).toBeGreaterThan(0);
      })
  });
});

describe('Item', function(){
  it('has a search function that returns OK', function(){
    api.item.search('football')
      .then(function(response){
        expect(response.statusCode).toBe(200);
      });
  });

  it('properly parses filters', function(){
    api.item.search('football', {
      starRating: 3
    })
      .then(function(response){
        expect(_.includes(response.req._header, 'star-rating'));
      })
  });

  it('actually returns content', function(){
    api.item.search('world')
      .then(function(r){
        expect(JSON.parse(r.body).response.results.length).toBeGreaterThan(0);
      })
  });
});
