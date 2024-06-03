import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardRestaurant from '../components/CardRestaurant';
import styles from './SearchResultsPage.module.css';
import Header from "../components/Header";

const SearchResultsPage = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (location.state?.filteredRestaurants) {
            setFilteredRestaurants(location.state.filteredRestaurants);
        }
    }, [location.state]);

    const handleRestaurantClick = (restaurantName) => {
        navigate(`/restaurant/name/${restaurantName}`);
    };

    return (
        <div>
            <Header />
            <div className={styles.resultsContainer}>
                <h1>Search Results for: {query}</h1>
                <div className={styles.restaurantsContainer}>
                    {filteredRestaurants.map(restaurant => (
                        <CardRestaurant
                            key={restaurant.id}
                            restaurant={restaurant}
                            onClick={() => handleRestaurantClick(restaurant.nume)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
