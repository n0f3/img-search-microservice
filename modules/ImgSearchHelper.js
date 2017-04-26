"use strict";
const request = require('request-promise');
const _ = require('underscore');
const imageApiKey = process.env.GOOGLE_SEARCH_KEY;
const imageSearchCx = process.env.GOOGLE_SEARCH_CX;

const config = {
  url: 'https://www.googleapis.com/customsearch/v1',
  method: 'GET',
  qs: {},
  json: true,
  headers: {
    'User-Agent': 'Request-Promise'
  }
};

const searchImages = (q, offset = 0, count = 10) => {
  console.log(`offset: ${offset} count: ${count}`);
  config.qs = {
    q,
    num: count,
    start: (offset * count) + 1,
    cx: imageSearchCx,
    key: imageApiKey,
    searchType: 'image'
  };
  return request(config);
};

module.exports = searchImages;