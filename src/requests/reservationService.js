import { baseUrl, config, withLogs } from "../utils";
import axios from "axios";

export const addReservation = async (reservation) => {
    try {
        const response = await axios.post(`${baseUrl}/api/reservations`, reservation);
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
