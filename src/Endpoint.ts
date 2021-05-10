import { get } from 'request';

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
  request: (params: Object) => Promise<Object>,
  search: (query: string, filters: object) => Function,
  getById: (id: string) => Function,
}

export class Endpoint implements IEndpoint {
  endpoint: string;
  key: string;
  http: string;
  base: string;
  availableFunctions: Array<string>;
  request: (params: Object) => Promise<any>;
  search: (query: string, filters: object) => Function;
  getById: (id: string) => Function;

  constructor(endpoint: string, key: string, useSSL: boolean, availableFunctions:Array<string> = ['search']) {
    this.endpoint = endpoint;
    this.key = key;
    this.http = useSSL ? 'https://' : 'http://';
    this.base = `${this.http}content.guardianapis.com`;
    this.availableFunctions = availableFunctions;

    this.request = function(params: Object) {
      return new Promise((resolve, reject) => {
        get(params, (err, res, body) => {
          if (err) reject(err);
  
          resolve({ response: res, body });
        });
      });
    }

    this.search = function (query: string = '', filters: object = {}) {
      if (!this.availableFunctions.includes('search')) {
       throw new GuardianJSInvalidMethodException('search is an invalid method'); 
      }
    
      let filter = '';
    
      Object.entries(filters).forEach((entry) => {
        const key = entry[0].replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        filter = `${filter}&${key}=${entry[1]}`;
      });
    
      return this.request(`${this.base}/${this.endpoint}?api-key=${this.key}&q=${query}${filter}`);
    }

    this.getById = function (id: string) {
      if (!this.availableFunctions.includes('getById')) {
       throw new GuardianJSInvalidMethodException('getById is an invalid method'); 
      }
    
      return this.request(`${this.base}/${id}?api-key=${this.key}`);
    }
  }
}