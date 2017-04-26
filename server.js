const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const home = require('./routes/Home');
const imgSearchHistory = require('./routes/ImgSearchHistory');
const imgSearch = require('./routes/ImgSearch');
const path = require('path');
const app = express();
const mongoLabUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imgSearchFCC';

mongoose.connect(mongoLabUrl);
mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', home);
app.get('/api/latest/imagesearch', imgSearchHistory);
app.get('/api/imagesearch/:searchQuery', imgSearch);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
