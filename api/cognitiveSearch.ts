//import fetch, { Response } from 'node-fetch';
import { ImageSearchClient } from '@azure/cognitiveservices-imagesearch';
import { ImagesSearchOptionalParams, ImagesSearchResponse } from '@azure/cognitiveservices-imagesearch/esm/models';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';

const imageApiKey = process.env.BING_SEARCH_SUBCRIPTION_KEY;

const cognitiveServiceCredentials = new CognitiveServicesCredentials(imageApiKey);

const client = new ImageSearchClient(cognitiveServiceCredentials)

const imageSearch = async (query: string, count?: number, offset?: number): Promise<ImagesSearchResponse> => {
  const options: ImagesSearchOptionalParams = {
    count: count ?? 10,
    offset: offset ?? 0,
    imageType: 'Photo',
    safeSearch: 'Strict',
  }

  return client.images.search(query, options)
}


export {
  imageSearch
}
