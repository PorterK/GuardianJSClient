"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Endpoint_1 = require("./Endpoint");
class Client {
    constructor(key, secure = false) {
        this.content = new Endpoint_1.Endpoint('search', key, secure);
        this.tags = new Endpoint_1.Endpoint('tags', key, secure);
        this.sections = new Endpoint_1.Endpoint('sections', key, secure);
        this.editions = new Endpoint_1.Endpoint('editions', key, secure);
        this.item = new Endpoint_1.Endpoint(null, key, secure, ['getById']);
    }
}
exports.Client = Client;
