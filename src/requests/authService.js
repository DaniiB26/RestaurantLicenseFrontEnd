import axios from 'axios';
import { baseUrl, config, withLogs } from '../utils';

/**
 * Login function
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {Promise} - A promise that resolves with the login response
 */
export const login = (email, password) => {
    return withLogs(
        axios.post(`${baseUrl}/api/login`, { email, password }, config),
        'login'
    );
};

/**
 * Register function
 * @param {Object} data - The registration data
 * @param {string} data.email - The email of the new user
 * @param {string} data.password - The password of the new user
 * @returns {Promise} - A promise that resolves with the registration response
 */
export const register = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/api/register`, data, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        }
        throw new Error('An error occurred during registration');
    }
};
