// CityRestaurants.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import Home from "../pages/Home";

const CityRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { city } = useParams();

    useEffect(() => {
        const getRestaurantsByCity = async () => {
            console.log(`Fetching restaurants for city: ${city}`);
            try {
                const response = await api.get(`/api/restaurants/search/by-city/${city}`);
                console.log('Response:', response.data);
                setRestaurants(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        if (city) {
            getRestaurantsByCity();
        }
    }, [city]);

    return <Home restaurants={restaurants} />;
}

export default CityRestaurants;
