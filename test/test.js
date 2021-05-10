'use strict';
const expect = require('expect');
const guardian = require('../dist').default;
let api = new guardian('2a896a41-f4fb-4dcd-829d-2034c043bb0d', false);


describe('Connection', () => {
  it('should return OK', async () => {
    const { response } = await api.content.search();

    expect(response.statusCode).toBe(200);
  })
});

describe('Content', async () => {
  it('has a search function that returns OK', async () => {
    const { response } = await api.content.search();
    
    expect(response.statusCode).toBe(200);
  });

  it('properly parses filters', async () => {
    const { response } = await api.content.search('football', {
      starRating: 3
    });
    
    expect(response.req._header.includes('star-rating'));
  });

  it('actually returns content', async () => {
    const response = await api.content.search('football');
    
    expect(JSON.parse(response.body).response.results.length).toBeGreaterThan(0);
  });

});

describe('Tags', () => {
  it('has a search function that returns OK', async () => {
   const { response } =  await api.tags.search();
    
   expect(response.statusCode).toBe(200);
  });

  it('properly parses filters', async () => {
    const { response } = await api.tags.search('football', {
      pageSize: 3
    });
    
    expect(response.req._header.includes('page-size'));
  });

  it('actually returns content', async () => {
    const response = await api.tags.search('sport');
    
    expect(JSON.parse(response.body).response.results.length).toBeGreaterThan(0);
  });
});

describe('Sections', () => {
  it('has a search function that returns OK', async () => {
    const { response } = await api.sections.search();
    
    expect(response.statusCode).toBe(200);
  });

  it('actually returns content', async () => {
    const { body } = await api.tags.search('world');
    
    expect(JSON.parse(body).response.results.length).toBeGreaterThan(0);
  });
});

describe('Editions', () => {
  it('has a search function that returns OK', async () => {
    const { response } = await api.editions.search();
    
    expect(response.statusCode).toBe(200);
  });

  it('actually returns content', async () => {
    const { body } = await api.editions.search('u');
    
    expect(JSON.parse(body).response.results.length).toBeGreaterThan(0);
  });
});

describe('Item', () => {
  it('has a search function that returns OK', async () => {
    const { response } = await api.item.getById('business/2014/feb/18/uk-inflation-falls-below-bank-england-target');
    
    expect(response.statusCode).toBe(200);
  });

  it('actually returns content', async () => {
    const { body } = await api.item.getById('business/2014/feb/18/uk-inflation-falls-below-bank-england-target');

    expect(JSON.parse(body).response.total).toBeGreaterThan(0);
  });
});
