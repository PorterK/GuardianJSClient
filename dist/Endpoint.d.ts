interface IEndpoint {
    endpoint: string;
    key: string;
    http: string;
    base: string;
    availableFunctions: Array<string>;
    request: (params: Object) => Promise<Object>;
    search: (query: string, filters: object) => Function;
    getById: (id: string) => Function;
}
export declare class Endpoint implements IEndpoint {
    endpoint: string;
    key: string;
    http: string;
    base: string;
    availableFunctions: Array<string>;
    request: (params: Object) => Promise<any>;
    search: (query: string, filters: object) => Function;
    getById: (id: string) => Function;
    constructor(endpoint: string, key: string, useSSL: boolean, availableFunctions?: Array<string>);
}
export {};
