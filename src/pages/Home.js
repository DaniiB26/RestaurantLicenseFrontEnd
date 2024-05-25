import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useCity } from "../context/CityContext";
import Header from '../components/Header';
import CardRestaurant from '../components/CardRestaurant';
import styles from './Home.module.css';
import useGeoLocation from "../hooks/useGeoLocation";
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = ({ restaurants }) => {
    const { user } = useContext(AuthContext);
    const { city, setCity } = useCity();
    const location = useGeoLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.city) {
            console.log("Detected city in Home component:", location.city);
            setCity(location.city);
        }
    }, [location.city, setCity]);

    const handleRestaurantClick = (restaurantName) => {
        navigate(`/restaurant/name/${restaurantName}`);
    };

    return (
        <div>
            <Header />
            <div className={styles.imageContainer}>
                <img src="/Table4.jpg" alt="Placeholder" className={styles.image} />
                <div className={styles.searchBarContainer}>
                    <input type="text" placeholder="Search your favorite restaurant...." className={styles.searchBar} />
                    <button className={styles.filterButton}>
                        <span className={`${styles.filterButtonIcon} material-icons`}>tune</span>
                    </button>
                </div>
            </div>
            <div className={styles.cityContainer}>
                <LocationOn className={styles.locationIcon} />
                <h1 className={styles.cityName}>{city}</h1>
            </div>
            <div className={styles.restaurantsContainer}>
                {restaurants && restaurants.map((restaurant) => (
                    <CardRestaurant
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={() => handleRestaurantClick(restaurant.nume)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
