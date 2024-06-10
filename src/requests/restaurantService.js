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

export const fetchRestaurantsByCity = async (city) => {
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/search/by-city/${city}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchFilteredRestaurants = async (oras, tipuri, ratingMin, pretMin) => {
    try {
        const response = await axios.post(`${baseUrl}/api/restaurants/filters`, {
            oras,
            tipuri,
            ratingMin,
            pretMin
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getRestaurantByManagerId = async (managerId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/restaurants/by-manager`, { managerId }, config);
        console.log('Restaurant data fetched:', response.data); // Log response data
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurant by manager ID:', error); // Log errors
        throw error;
    }
};

export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSimilarRestaurants = async (restaurantId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/similar/${restaurantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
