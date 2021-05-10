import { Endpoint } from './Endpoint';

interface IClient {
  content: Endpoint,
  tags: Endpoint,
  sections: Endpoint,
  editions: Endpoint,
  item: Endpoint,
}

export class Client implements IClient {
  content: Endpoint;
  tags: Endpoint;
  sections: Endpoint;
  editions: Endpoint;
  item: Endpoint;

  constructor(key: string, secure: boolean = false) {
    this.content = new Endpoint('search', key, secure);
    this.tags = new Endpoint('tags', key, secure);
    this.sections = new Endpoint('sections', key, secure);
    this.editions = new Endpoint('editions', key, secure);
    this.item = new Endpoint(null, key, secure, ['getById']);
  }
}
