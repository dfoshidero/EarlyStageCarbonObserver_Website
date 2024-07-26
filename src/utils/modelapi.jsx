// utils.jsx

import axios from "axios";

// Base URL for the API
const BASE_URL = "http://35.177.205.83:80";

/**
 * Function to call the extract_predict API.
 * @param {string} text - The input text.
 * @returns {Promise<number>} - The numerical prediction.
 */
export const extractPredict = async (text) => {
  try {
    const response = await axios.post(`${BASE_URL}/extract_predict`, { text });
    return response.data;
  } catch (error) {
    console.error("Error in extractPredict:", error);
    throw error;
  }
};

/**
 * Function to call the extract API.
 * @param {string} text - The input text.
 * @returns {Promise<Object>} - The extracted features.
 */
export const extract = async (text) => {
  try {
    const response = await axios.post(`${BASE_URL}/extract`, { text });
    return response.data;
  } catch (error) {
    console.error("Error in extract:", error);
    throw error;
  }
};

/**
 * Function to call the predict API.
 * @param {Object} data - The extracted features.
 * @returns {Promise<number>} - The numerical prediction.
 */
export const predict = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, { data });
    return response.data;
  } catch (error) {
    console.error("Error in predict:", error);
    throw error;
  }
};
