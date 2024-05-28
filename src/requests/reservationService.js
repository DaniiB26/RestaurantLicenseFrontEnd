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
