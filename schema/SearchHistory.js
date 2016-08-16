"use strict";
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let searchSchema = new Schema({
  searchQuery: { type: String, default: '' },
  searchTime: { type: String, default: '' }
});

searchSchema.methods.fillSearch = function(searchQuery, searchDate) {
  this.searchQuery = searchQuery;
  this.searchTime = searchDate.toISOString();
};

if (!searchSchema.options.toObject) searchSchema.options.toObject = {};
searchSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id;
  delete ret.__v;
  return ret;
}

let SearchHistory = mongoose.model('SearchHistory', searchSchema);

module.exports = SearchHistory;