import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

export const addReservation = async (reservation) => {
    try {
        const response = await axios.post(`${baseUrl}/api/reservations`, reservation, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getReservationsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/reservations/user/${userId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getReservationsByRestaurantId = async (restaurantId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/reservations/restaurant/${restaurantId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateReservationStatus = async (reservationId, newStatus) => {
    try {
        const response = await axios.post(`${baseUrl}/api/reservations/update-status/${reservationId}`, { status: newStatus }, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const rateUserForReservation = async (reservationId, rating) => {
    try {
        const response = await axios.post(`${baseUrl}/api/reservations/${reservationId}/rate-user`, null, {
            params: { rating }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
