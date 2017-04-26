# Image search microservice

Express based microservice API that lets you search for images on the web and browse recent search queries.

## Api documentation

* `GET /api/imagesearch/:searchQuery`
  Used to initiate a new image search with the desired query string. Returns a list of JSON objects:
```
[
  {
    "imgUrl": "urlOfImage",
    "snippet": "searchResultSnippet",
    "thumbnail": "thumbnailUrl",
    "context": "webPageImageHost"
  }
]
```
* `GET /api/latest/imagesearch`
  Used to return a list of recent searches. Returns a list of JSON objects:
```
[
  {
    searchTime: "utcTimeOfSearch",
    searchQuery: "queryTerm"
  }
]
```

## [Live Demo](https://imgsearchly.herokuapp.com/)

## Project structure
```
.
├── modules
│   ├── ImgSearchHelper.js
│   └── UrlValidator.js
├── package.json
├── README.md
├── routesc
│   ├── Home.js
│   ├── ImgSearchHistory.js
│   └── ImgSearch.js
├── schema
│   └── SearchHistory.js
└── server.js

```