import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export interface SearchHistoryItem {
  query: string;
  time: string;
}

export const saveSearch = async (query: string, time: Date): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> => {
  const params = {
    TableName: 'imgsearch',
    Item: {
      id: uuidv4(),
      query,
      time: time.toISOString()
    }
  }

  try {
    const result = await dynamoDB.put(params).promise();
    return Promise.resolve(result);
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const retrieveHistory = async () => {
  try {
    const params = {
      TableName: 'imgsearch',
      Limit: 10
    }
    const result = await dynamoDB.scan(params);
    const items = await result.promise();
    console.log('scanned items: ', items.Items.sort((item1, item2) => item1.time < item2.time))
    return Promise.resolve(items.Items.sort((item1, item2) => new Date(item1.time) - new Date(item2.time)));
  } catch (e) {
    console.error(e);
    throw e;
  }
}
