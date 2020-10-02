import { APIGatewayProxyHandler } from 'aws-lambda';
import validator from 'validator';
import 'source-map-support/register';
import { imageSearch } from './api/cognitiveSearch';
import { saveSearch, retrieveHistory } from './api/history';

export const search: APIGatewayProxyHandler = async (event, _context) => {
  const searchQuery: string = event.pathParameters.searchQuery;
  if (!searchQuery || !validator.isAlphanumeric(searchQuery)) {
    return {
      statusCode: 400,
      body: 'Error 400: invalid string search parameter, make sure it\'s a string that contains only letters and numbers'
    }
  }

  try {
    const returnSave = await saveSearch(searchQuery, new Date());
    console.log('Saved to DynamoDB: ', returnSave);
  } catch (e) {
    console.error(e);
  }

  try {
    const result = await imageSearch(searchQuery);
    const returnObject = result.value.map((value) => ({
      imgUrl: value.contentUrl,
      snippet: value.name,
      thumbnail: value.thumbnailUrl,
      context: value.hostPageDisplayUrl
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(returnObject)
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Uknown error',
        input: event,
      }, null, 2)
    }
  }
}

export const history: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const results = await retrieveHistory();
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e,
        input: event
      }, null, 2)
    }
  }
}
