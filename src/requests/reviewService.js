import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

export const findReviewsByRestaurant = async (restaurantId) => {

    try {
        const response = await axios.get(`${baseUrl}/api/reviews/restaurant/${restaurantId}`);
        return response.data;
    }catch (error) {
        throw error;
    }
};

export const addReview = async (review) => {
    try {
        const response = await axios.post(`${baseUrl}/api/reviews`, review, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getReviewsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/reviews/user/${userId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};