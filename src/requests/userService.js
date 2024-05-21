import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

/**
 * Function to get user by email
 * @param {string} email - The email of the user
 * @returns {Promise} - A promise that resolves with the user data
 */
export const getUserByEmail = (email) => {
    return withLogs(
        axios.get(`${baseUrl}/users/${email}`, config),
        "getUserByEmail"
    );
};