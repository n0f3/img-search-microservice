const express = require('express');
const mongoose = require('mongoose');

const home = require('./routes/Home');
const imgSearchHistory = require('./routes/ImgSearchHistory');
const imgSearch = require('./routes/ImgSearch');

const app = express();
const mongoLabUrl = process.env.MONGOLAB_URI;
const imageApiKey = process.env.BING_SEARCH_KEY;

mongoose.connect(mongoLabUrl);

app.set('port', process.env.PORT || 8080);

app.get('/', home);
app.get('/api/latest/imagesearch', imgSearchHistory);
app.get('/api/imagesearch/:searchQuery', imgSearch);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));