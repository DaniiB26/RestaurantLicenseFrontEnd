import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

export const getNotifications = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/notifications/user/${userId}`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const markNotificationsAsRead = async (userId) => {
    try {
        await axios.post(`${baseUrl}/api/notifications/mark-read`, { userId }, config);
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        throw error;
    }
};

export const createNotification = async (userId, restaurantId, message) => {
    try {
        const response = await axios.post(`${baseUrl}/api/notifications/createReservationNotification`, { userId, restaurantId, message }, config);
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};