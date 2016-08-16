"use strict";
const request = require('request-promise');
const _ = require('underscore');
const queryObj = {};

const config = {
  url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
  method: 'GET',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_KEY
  },
  qs: queryObj,
  json: true
};

const parseResponseBody = function(resBody) {
  if(resBody) {
    const results = resBody.value;
    return results.map((element) => {
      return {
        url: element.contentUrl,
        snippet: element.name,
        thumbnail: element.thumbnailUrl,
        context: element.hostPageUrl
      }
    });
  }
};

const searchImages = function(queryString, offsetQuery, countQuery) {
  queryObj.q = queryString;
  queryObj.offset = offsetQuery;
  queryObj.count = countQuery;
  return request(config);
};

module.exports = searchImages;