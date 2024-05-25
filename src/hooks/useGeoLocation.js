// hooks/useGeoLocation.js
import { useState, useEffect } from 'react';

export default function useGeoLocation() {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    async function getLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            console.log("API Response:", data); // Debug: Log the API response
            setLocationData(data);
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    }

    return {
        city: locationData?.city,
        lat: locationData?.latitude,
        lon: locationData?.longitude,
    };
}
