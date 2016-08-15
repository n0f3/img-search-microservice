var express = require('express');
var mongoose = require('mongoose');
var SearchHistory = require('./schema/SearchHistory');
var urlvalidator = require('./modules/UrlValidator');
var _ = require('underscore');
var imageSearch = require('./modules/BingImgSearch');

var app = express();
const mongoLabUrl = process.env.MONGOLAB_URI;
const imageApiKey = process.env.BING_SEARCH_KEY;

mongoose.connect(mongoLabUrl);

app.set('port', process.env.PORT || 8080);
app.get('/', (req, res) => {
  res.send('Hello img search');
});

app.get('/api/latest/imagesearch', (req, res) => {
  SearchHistory
    .find()
    .limit(10)
    .select('searchQuery searchTime -_id')
    .sort({searchTime: -1})
    .exec((err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    })
});

app.get('/api/imagesearch/:searchQuery', (req, res) => {
  if(req.params.searchQuery) {
    var offsetQuery = 0;
    var countQuery = 150;
    if(!_.isEmpty(req.query)) {
      if(_.has(req.query, 'offset')) {
        offsetQuery = parseInt(req.query.offset, 10);
      }
      if(_.has(req.query, 'count')) {
        countQuery = parseInt(req.query.count, 10);
      }
    }
    imageSearch(req.params.searchQuery, offsetQuery, countQuery)
      .then((data) => {
        var searchObj = new SearchHistory();
        searchObj.fillSearch(req.params.searchQuery, new Date(Date.now()));
        searchObj.save((err) => {
          if(err) throw err;
          console.log(`Saved search obj: ${JSON.stringify(searchObj.toObject())}`)
        });
        console.log(data.value.slice(0, 10));
        var returnData = data.value.slice(0, 10).map((currObj) => {
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
});

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));