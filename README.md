[![NPM](https://nodei.co/npm/guardian-js.png)](https://nodei.co/npm/guardian-js/)

# GuardianJSClient
A JavaScript client library for the Guardian API

### Installation

```sh
$ npm install --save guardian-js
```

### Examples

The documentation for the Guardian API can be found [here](http://open-platform.theguardian.com/documentation/)

In order to connect you'll need an api key, which you can easily generate [here](http://open-platform.theguardian.com/access/)

The developer api key gives you limited access to all portions of the api, and nearly all portions of the news (well over 1.7m articles)

To start using the API, you should first instantiate the guardian prototype

```js
const guardian = require('guardian-js');

let api = new guardian(apiKey, false);
```

The 2nd argument in the guardian constructor is a boolean indicating whether you'd like to use https or not.

To make a call, it's as easy as

```js
api.content.search('football', {
  tag: 'sports'
});
```
The api object has 5 methods that all ship with a `search` function. The objects are all follows

```sh
  content, tags, sections, editions, item
```
The first parameter of the `search` function is the query term, the 2nd parameter can be any other valid parameter (see the [documentation](http://open-platform.theguardian.com/documentation/) to see which parameters to use)

Parameters which contains dashes should be transformed to camel case.

For example, to search for a `basketball` article with a `star-rating` of 3, the following would be valid:

```js
api.content.search('basketball', {
  starRating: 3
});
```

### Contributing

Feel free to contribute, just submit a PR if you have anyhting to add.

### License

This product is released under the [MIT](https://opensource.org/licenses/MIT) license.
