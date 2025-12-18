import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { AXIOS_ERROR_CODES } from '../shared/constants';

export type ApiError = {
  status?: number;
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

/**
 * Normalizes Axios errors into a consistent ApiError format.
 * Handles server responses, network issues, and timeouts.
 */
const normalizeError = (error: AxiosError): ApiError => {
  // Case 1: The server responded with a status code outside the 2xx range
  if (error.response) {
    const { status, data } = error.response;
    let message = 'An error occurred';

    // Attempt to extract meaningful error message from server response
    if (data && typeof data === 'object') {
      const serverData = data as { message?: string | string[] };

      if (Array.isArray(serverData.message)) {
        // Handle array of validation errors (standard NestJS format)
        message = serverData.message
          .filter((msg): msg is string => typeof msg === 'string')
          .map((msg) => msg.charAt(0).toUpperCase() + msg.slice(1))
          .join('. ');
      } else if (typeof serverData.message === 'string') {
        message = serverData.message;
      }
    }

    return { status, message };
  }

  // Case 2: The request was made but no response was received (network issues)
  if (error.request) {
    if (error.code === AXIOS_ERROR_CODES.ECONNABORTED) {
      return { message: 'Request timed out. Please check your connection and try again.' };
    }
    return { message: 'Unable to connect to the server. Please check your internet connection.' };
  }

  // Case 3: Something else happened while setting up the request
  return { message: error.message || 'An unexpected error occurred' };
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(normalizeError(error));
  }
);


