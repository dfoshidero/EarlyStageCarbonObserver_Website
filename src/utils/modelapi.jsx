// utils.jsx

import axios from "axios";

// Base URL for the API
const BASE_URL = "https://e4ihifenad.execute-api.eu-west-2.amazonaws.com/dev";

/**
 * Function to call the extract_predict API.
 * @param {string} text - The input text.
 * @returns {Promise<number>} - The numerical prediction.
 */
export const extractPredict = async (text) => {
  try {
    const response = await axios.post(`${BASE_URL}/extract_predict`, { text: text });
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
    const response = await axios.post(`${BASE_URL}/extract`, { text: text });
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
    const formattedData = {
      SECTOR: data["Sector"],
      SUBSECTOR: data["Sub-Sector"],
      GIA: data["Gross Internal Area (m2)"],
      PERIMETER: data["Building Perimeter (m)"],
      FOOTPRINT: data["Building Footprint (m2)"],
      WIDTH: data["Building Width (m)"],
      HEIGHT: data["Floor-to-Floor Height (m)"],
      ABOVE_GROUND: data["Storeys Above Ground"],
      BELOW_GROUND: data["Storeys Below Ground"],
      GLAZING_RATIO: data["Glazing Ratio (%)"],
      PILES: data["Piles Material"],
      PILE_CAPS: data["Pile Caps Material"],
      CAPPING_BEAMS: data["Capping Beams Material"],
      RAFT: data["Raft Foundation Material"],
      BASEMENT_WALLS: data["Basement Walls Material"],
      LOWEST_FLOOR_SLAB: data["Lowest Floor Slab Material"],
      GROUND_INSULATION: data["Ground Insulation Material"],
      CORE_STRUCTURE: data["Core Structure Material"],
      COLUMNS: data["Columns Material"],
      BEAMS: data["Beams Material"],
      SECONDARY_BEAMS: data["Secondary Beams Material"],
      FLOOR_SLAB: data["Floor Slab Material"],
      JOISTED_FLOORS: data["Joisted Floors Material"],
      ROOF: data["Roof Material"],
      ROOF_INSULATION: data["Roof Insulation Material"],
      ROOF_FINISHES: data["Roof Finishes Material"],
      FACADE: data["Facade Material"],
      WALL_INSULATION: data["Wall Insulation Material"],
      GLAZING: data["Glazing Material"],
      WINDOW_FRAMES: data["Window Frames Material"],
      PARTITIONS: data["Partitions Material"],
      CEILINGS: data["Ceilings Material"],
      FLOORS: data["Floors Material"],
      SERVICES: data["Services"]
    };

    const response = await axios.post(`${BASE_URL}/predict`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error in predict:", error);
    throw error;
  }
};

