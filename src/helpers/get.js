const request = require('request');

module.exports = (params) => {
    return new Promise((resolve, reject) => {
      request.get(params, (err, res, body) => {
        if (err) reject(err);

        return ({ res, body });
      });
    });
  }