import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import Home from "../pages/Home";  // Poți redenumi acest fișier dacă dorești

const CityRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { city } = useParams();

    useEffect(() => {
        const getRestaurantsByCity = async () => {
            console.log(`Fetching restaurants for city: ${city}`);
            try {
                const response = await api.get(`/api/restaurants/search/by-city/${city}`);
                console.log('Response:', response.data);
                setRestaurants(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setRestaurants([]);
            }
        };

        if (city) {
            getRestaurantsByCity();
        }
    }, [city]);

    return <Home restaurants={restaurants} />;
}

export default CityRestaurants;
