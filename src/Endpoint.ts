interface IGuardianJSInvalidMethodException {
  message: string,
  name: string,
}

class GuardianJSInvalidMethodException implements IGuardianJSInvalidMethodException {
  message: string;
  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'GuardianJSInvalidMethodException';
  }
}

interface IEndpoint {
  endpoint: string,
  key: string,
  http: string,
  base: string,
  availableFunctions: Array<string>,
  _request: (params: Object) => Promise<Object>,
  search: (query: string, filters: object) => Promise<unknown>,
  getById: (id: string) => Promise<unknown>,
}

export class Endpoint implements IEndpoint {
  endpoint: string;
  key: string;
  http: string;
  base: string;
  availableFunctions: Array<string>;

  constructor(endpoint: string, key: string, useSSL: boolean, availableFunctions:Array<string> = ['search']) {
    this.endpoint = endpoint;
    this.key = key;
    this.http = useSSL ? 'https://' : 'http://';
    this.base = `${this.http}content.guardianapis.com`;
    this.availableFunctions = availableFunctions;
  }

  /**
   * Internal request wrapper
   * @param url URL to send the request to
   * @returns Response data
   */
  async _request(url: string) {
    const resp = await fetch(url);
    const body = await resp.json();

    if (resp.status >= 400) {
      throw new Error(body.message);
    }

    return body.response;
  }

  /**
   * Search the Guardian api
   * @param query The string to search on
   * @param filters A list of filters
   * @returns Response data
   */
  async search(query: string = '', filters: object = {}) {
    if (!this.availableFunctions.includes('search')) {
     throw new GuardianJSInvalidMethodException('search is an invalid method'); 
    }
  
    let filter = '';
  
    Object.entries(filters).forEach((entry) => {
      const key = entry[0].replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      filter = `${filter}&${key}=${entry[1]}`;
    });
  
    return this._request(`${this.base}/${this.endpoint}?api-key=${this.key}&q=${query}${filter}`);
  }

  /**
   * Get an item by ID
   * @param id ID of the item to get
   * @returns Response data
   */
  async getById(id: string) {
    if (!this.availableFunctions.includes('getById')) {
     throw new GuardianJSInvalidMethodException('getById is an invalid method'); 
    }
  
    return this._request(`${this.base}/${id}?api-key=${this.key}`);
  }
}
