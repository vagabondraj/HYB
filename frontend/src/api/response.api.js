import axios from './axios';
import { API_ROUTE } from '../constants/constant';

const responsesAPI = {
  // Create response 
  create: async ({ requestId, message, image }) => {
    const formData = new FormData();
    formData.append('requestId', requestId);

    if (message) formData.append('message', message);
    if (image) formData.append('image', image);

    const { data } = await axios.post(
      API_ROUTE.RESPONSES.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  },

  // Get my responses
  getMyResponses: async () => {
    const { data } = await axios.get(API_ROUTE.RESPONSES.GET_MY);
    return data;
  },

  // Get responses for a specific request
  getForRequest: async (requestId) => {
    const { data } = await axios.get(
      API_ROUTE.RESPONSES.GET_FOR_REQUEST(requestId)
    );
    return data;
  },

  // Accept a response
  accept: async (responseId) => {
    const { data } = await axios.put(
      API_ROUTE.RESPONSES.ACCEPT(responseId)
    );
    return data;
  },

  // Reject a response
  reject: async (responseId) => {
    const { data } = await axios.put(
      API_ROUTE.RESPONSES.REJECT(responseId)
    );
    return data;
  },
};

export default responsesAPI;
