# Image search serverless microservice
Simple service that searches images, keeps track of search history and returns the 10 most recent searches performed

## Technologies
### Search
Performed using Azure Cognitive Search cloud service.
### Storage
AWS DynamoDB instance.
### Serverless functions
AWS Lambda

Serverless framework is used for deployment and setup of serverless functions, written in Typescript.


## Project structure
```
├── api
│   ├── cognitiveSearch.ts
│   └── history.ts
├── imageSearch.ts
├── package-lock.json
├── package.json
├── readme.md
├── serverless.yml
├── tsconfig.json
└── webpack.config.js
```

## Examples

`GET /api/history/imagesearch`
```
[
  {
    "id": "f937f1d6-88e4-4fe5-aa28-2deb768bbe6d",
    "query": "history",
    "time": "2020-10-02T00:56:02.513Z"
  },
  {
    "id": "7489b627-619e-43f4-9e1a-2d30911fac9b",
    "query": "history",
    "time": "2020-10-02T00:55:29.360Z"
  },
  {
    "id": "b4ec3d4c-0b45-4515-a049-53522f427744",
    "query": "pug",
    "time": "2020-10-01T22:16:33.567Z"
  }
]
```
`GET /api/imagesearch/{searchQuery}`

### Optional Parameters
`count` defaults to 10
`offset` defaults to 0

```
[
  {
    "imgUrl": "http://www.petpaw.com.au/wp-content/uploads/2014/06/Pug-4.jpg",
    "snippet": "Pug Breed Guide - Learn about the Pug.",
    "thumbnail": "https://tse1.mm.bing.net/th?id=OIP.hp-Tsbnv6yy2RrcWRo9mVgHaE8&pid=Api",
    "context": "www.petpaw.com.au/breeds/pug"
  },
  {
    "imgUrl": "http://pugpugpug.com/wp-content/uploads/2014/05/Pug-Dog-7.jpg",
    "snippet": "PugPugPug.com | How do i make a depressed pug happy?",
    "thumbnail": "https://tse1.mm.bing.net/th?id=OIP.mcxppzQTI3jjvSKbZ1V6UQHaFM&pid=Api",
    "context": "pugpugpug.com/how-do-i-make-a-depressed-pug-happy"
  },
  ...
```
