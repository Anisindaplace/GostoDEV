import { CALL_API } from 'redux-api-middleware';
import config from '../config';

export default store => next => (action) => {
  const callApi = action[CALL_API];

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    // Send credentials
    callApi.credentials = 'include';

    // Add the API base URL
    if (callApi.endpoint.indexOf('http://') < 0 && callApi.endpoint.indexOf('//') < 0) {
      callApi.endpoint = config.api.baseURL + callApi.endpoint;
    }

    // Fetch support both JSON and multipart/form-data
    if (!(callApi.body instanceof FormData)) {
      // Set JSON content type header
      callApi.headers = { ...callApi.headers, 'Content-Type': 'application/json' };

      // Convert objects to string
      if (typeof callApi.body === 'object') {
        callApi.body = JSON.stringify(callApi.body);
      }
    }
  }

  // Pass the FSA to the next action.
  return next(action);
};
