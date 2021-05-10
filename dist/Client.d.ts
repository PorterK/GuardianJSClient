import { Endpoint } from './Endpoint';
interface IClient {
    content: Endpoint;
    tags: Endpoint;
    sections: Endpoint;
    editions: Endpoint;
    item: Endpoint;
}
export declare class Client implements IClient {
    content: Endpoint;
    tags: Endpoint;
    sections: Endpoint;
    editions: Endpoint;
    item: Endpoint;
    constructor(key: string, secure?: boolean);
}
export {};
