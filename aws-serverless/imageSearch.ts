import { APIGatewayProxyHandler } from 'aws-lambda';
import validator from 'validator';
import 'source-map-support/register';
import { imageSearch } from './api/cognitiveSearch';

export const search: APIGatewayProxyHandler = async (event, _context) => {
  const searchQuery: string = event.pathParameters.searchQuery;
  if (!searchQuery || !validator.isAlphanumeric(searchQuery)) {
    return {
      statusCode: 400,
      body: 'Error 400: invalid string search parameter, make sure it\'s a string that contains only letters and numbers'
    }
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

export const latest: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'image search latest has been called',
      input: event,
    }, null, 2),
  }
}
