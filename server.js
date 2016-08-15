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
    const offsetQuery = 0;
    const count = 10;
    if(!_.isEmpty(req.query) && _.has(req.query, 'offset')) {
      offsetQuery = Number(req.query.offset);
    }
    imageSearch(req.params.searchQuery, offsetQuery, count)
      .then((data) => {
        const searchObj = new SearchHistory();
        searchObj.fillSearch(req.params.searchQuery, new Date(Date.now()));
        searchObj.save((err) => {
          if(err) throw err;
          console.log(`Saved search obj: ${JSON.stringify(searchObj.toObject())}`)
        });
        const returnData = data.value.map((obj) => {
          return {
            imgUrl: obj.contentUrl,
            snippet: obj.name,
            thumbnail: obj.thumbnailUrl,
            context: obj.hostPageUrl
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