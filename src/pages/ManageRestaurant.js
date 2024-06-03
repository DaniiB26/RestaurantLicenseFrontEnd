// src/components/ManageRestaurant.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../requests/restaurantService';
import styles from './ManageRestaurant.module.css';

const ManageRestaurant = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = await getRestaurantById(restaurantId);
                setRestaurant(restaurantData);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurant();
    }, [restaurantId]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.manageRestaurant}>
            <h1>Manage Restaurant: {restaurant.nume}</h1>
            {/* Add your restaurant management UI here */}
        </div>
    );
};

export default ManageRestaurant;
