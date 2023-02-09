interface IEndpoint {
    endpoint: string;
    key: string;
    http: string;
    base: string;
    availableFunctions: Array<string>;
    _request: (params: Object) => Promise<Object>;
    search: (query: string, filters: object) => Promise<unknown>;
    getById: (id: string) => Promise<unknown>;
}
export declare class Endpoint implements IEndpoint {
    endpoint: string;
    key: string;
    http: string;
    base: string;
    availableFunctions: Array<string>;
    constructor(endpoint: string, key: string, useSSL: boolean, availableFunctions?: Array<string>);
    /**
     * Internal request wrapper
     * @param url URL to send the request to
     * @returns Response data
     */
    _request(url: string): Promise<any>;
    /**
     * Search the Guardian api
     * @param query The string to search on
     * @param filters A list of filters
     * @returns Response data
     */
    search(query?: string, filters?: object): Promise<any>;
    /**
     * Get an item by ID
     * @param id ID of the item to get
     * @returns Response data
     */
    getById(id: string): Promise<any>;
}
export {};
