import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

/**
 * Function to get restaurant by name
 * @param {string} name - The name of the restaurant
 * @returns {Promise} - A promise that resolves with the restaurant data
 */
export const getRestaurantByName = async (name) => {
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/by-name/${name}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
