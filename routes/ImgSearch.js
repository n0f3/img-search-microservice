"use strict";
const bingImgSearchHelper = require('../modules/BingImgSearch');
const SearchHistory = require('../schema/SearchHistory');
const _ = require('underscore');

const imgSearchCallback = (req, res) => {
  if(req.params.searchQuery) {
    let offsetQuery = 0;
    let countQuery = 150;
    if(!_.isEmpty(req.query)) {
      if(_.has(req.query, 'offset')) {
        offsetQuery = parseInt(req.query.offset, 10);
      }
      if(_.has(req.query, 'count')) {
        countQuery = parseInt(req.query.count, 10);
      }
    }
    bingImgSearchHelper(req.params.searchQuery, offsetQuery, countQuery)
      .then((data) => {
        const searchObj = new SearchHistory();
        searchObj.fillSearch(req.params.searchQuery, new Date(Date.now()));
        searchObj.save((err) => {
          if(err) throw err;
          console.log(`Saved search obj: ${JSON.stringify(searchObj.toObject())}`)
        });
        
        const returnData = data.value.slice(0, 10).map((currObj) => {
          return {
            imgUrl: currObj.contentUrl,
            snippet: currObj.name,
            thumbnail: currObj.thumbnailUrl,
            context: currObj.hostPageUrl
          }
        });
        res.send(returnData);
      })
      .catch((err) => {
        if(err) throw err;
      })
  }
}

module.exports = imgSearchCallback;