import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8002/api';

/**
 * Fetches stock analysis data from the backend with retry logic
 * @returns {Promise} Promise object with the stock analysis data
 */
export const fetchStockAnalysis = async (retries = 3) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/`, {
      timeout: 10000, // Increased timeout to 10 seconds
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Add retry logic
      retry: retries,
      retryDelay: 1000,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // If we have retries left, try again
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts remaining`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      return fetchStockAnalysis(retries - 1);
    }
    
    // If all retries failed, throw a more descriptive error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request error: ${error.message}`);
    }
  }
}; 