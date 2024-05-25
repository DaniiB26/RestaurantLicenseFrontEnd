import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RestaurantPage.module.css';
import { getRestaurantByName } from "../requests/restaurantService";
import Header from "../components/Header";

const RestaurantPage = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurantByName(name);
                console.log('Response data:', data); // Debugging line
                setRestaurant(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!restaurant) {
        return <div>Restaurant not found</div>;
    }

    return (
        <div>
            <Header />
            <div className={styles.menuContainer}>
                <nav className={styles.menu}>
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                        <li><a href="#reserve">Reserve</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
            <div className={styles.restaurantPage}>
                <h1>{restaurant.nume}</h1>
                {/* Afișează alte detalii ale restaurantului aici */}
            </div>
        </div>
    );
};

export default RestaurantPage;
