const SearchHistory = require('../schema/SearchHistory');

const searchHistoryCallback = (req, res) => {
  SearchHistory
    .find()
    .limit(10)
    .select('searchQuery searchTime -_id')
    .sort({searchTime: -1})
    .exec((err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
}

module.exports = searchHistoryCallback;