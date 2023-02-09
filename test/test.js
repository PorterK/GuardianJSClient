'use strict';
const guardian = require('../dist').default;
let api = new guardian('test_api_key', false);


describe('Connection', () => {
  it('should return OK', async () => {
    const response = await api.content.search();

    expect(response.status).toEqual('ok');
  })
});

describe('Content', () => {
  it('has a search function that returns OK', async () => {
    const response = await api.content.search();
    
    expect(response.status).toEqual('ok');
  });

  it('properly parses filters', async () => {    
    const spy = jest.spyOn(api.content, '_request');

    await api.content.search('football', {
      starRating: 3
    });

    expect(spy.mock.calls[0][0].includes('star-rating=3')).toEqual(true);
  });

  it('actually returns content', async () => {
    const response = await api.content.search('football');
    
    expect(response.results.length).toBeGreaterThan(0);
  });

});

describe('Tags', () => {
  it('has a search function that returns OK', async () => {
   const response =  await api.tags.search();
    
   expect(response.status).toEqual('ok');
  });

  it('properly parses filters', async () => {
    const spy = jest.spyOn(api.tags, '_request');

    await api.tags.search('basketball', {
      pageSize: 3
    });
    
    expect(spy.mock.calls[0][0].includes('page-size=3')).toEqual(true);
  });

  it('actually returns content', async () => {
    const response = await api.tags.search('sport');
    
    expect(response.results.length).toBeGreaterThan(0);
  });
});

describe('Sections', () => {
  it('has a search function that returns OK', async () => {
    const response = await api.sections.search();
    
    expect(response.status).toEqual('ok');
  });

  it('actually returns content', async () => {
    const response = await api.tags.search('world');
    
    expect(response.results.length).toBeGreaterThan(0);
  });
});

describe('Editions', () => {
  it('has a search function that returns OK', async () => {
    const response = await api.editions.search();
    
    expect(response.status).toEqual('ok');
  });

  it('actually returns content', async () => {
    const response = await api.editions.search('u');
    
    expect(response.results.length).toBeGreaterThan(0);
  });
});

describe('Item', () => {
  it('has a search function that returns OK', async () => {
    const response = await api.item.getById('business/2014/feb/18/uk-inflation-falls-below-bank-england-target');
    
    expect(response.status).toEqual('ok');
  });

  it('actually returns content', async () => {
    const response = await api.item.getById('business/2014/feb/18/uk-inflation-falls-below-bank-england-target');

    expect(response.total).toBeGreaterThan(0);
  });
});
