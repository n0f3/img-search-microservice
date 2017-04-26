"use strict";
const imgSearchHelper = require('../modules/ImgSearchHelper');
const SearchHistory = require('../schema/SearchHistory');
const _ = require('underscore');
const validator = require('validator');

const imgSearchCallback = (req, res) => {
  if(!req.params || !req.params.searchQuery || 
    !validator.isAlphanumeric(req.params.searchQuery)) {
      res.status(400).send(`Error 400: invalid string search parameter, make sure it's a string that contains only letters and numbers`);
    }
  if(req.params.searchQuery) {
    let offsetQuery;
    let countQuery;
    if(!_.isEmpty(req.query)) {
      if(_.has(req.query, 'offset')) {
        offsetQuery = parseInt(req.query.offset, 0);
      }
      if(_.has(req.query, 'count')) {
        countQuery = parseInt(req.query.count, 10);
      }
    }
    imgSearchHelper(req.params.searchQuery, offsetQuery, countQuery)
      .then((data) => {
        const searchObj = new SearchHistory();
        searchObj.fillSearch(req.params.searchQuery, new Date(Date.now()));
        searchObj.save((err) => {
          if(err) throw err;
          console.log(`Saved search obj: ${JSON.stringify(searchObj.toObject())}`)
        });
        
        const returnData = data.items.map((currObj) => {
          return {
            imgUrl: currObj.link,
            snippet: currObj.snippet,
            thumbnail: currObj.image.thumbnailLink,
            context: currObj.image.contextLink
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