import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useCity } from "../context/CityContext";
import Header from '../components/Header';
import CardRestaurant from '../components/CardRestaurant';
import FilterModal from '../components/FilterModal';
import styles from './Home.module.css';
import useGeoLocation from "../hooks/useGeoLocation";
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchFilteredRestaurants, fetchRestaurantsByCity } from "../requests/restaurantService";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { city, setCity } = useCity();
    const location = useGeoLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        if (location.city) {
            console.log("Detected city in Home component:", location.city);
            setCity(location.city);
        }
    }, [location.city, setCity]);

    useEffect(() => {
        const getRestaurantsByCity = async () => {
            if (city) {
                console.log(`Fetching restaurants for city: ${city}`);
                try {
                    const response = await fetchRestaurantsByCity(city);
                    console.log('Response:', response);
                    setRestaurants(Array.isArray(response) ? response : []);
                    setFilteredRestaurants(Array.isArray(response) ? response : []);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            }
        };

        getRestaurantsByCity();
    }, [city]);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = restaurants.filter(restaurant =>
                restaurant.nume.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredRestaurants(filtered);
        } else {
            setFilteredRestaurants(restaurants);
        }
    }, [searchQuery, restaurants]);

    const handleRestaurantClick = (restaurantName) => {
        navigate(`/restaurant/name/${restaurantName}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate('/search', { state: { query: searchQuery, filteredRestaurants } });
        }
    };

    const handleFilterButtonClick = () => {
        setIsFilterModalOpen(true);
    };

    const handleFilterApply = async (filters) => {
        try {
            console.log(`Your city: ${city}`);
            const response = await fetchFilteredRestaurants(city, filters.tipRestaurant, filters.rating_mediu, filters.pret);
            setFilteredRestaurants(response);
            navigate('/search', { state: { filteredRestaurants: response } });
        } catch (error) {
            console.error('Error fetching filtered restaurants:', error);
        }
    };

    const restaurantTypes = [...new Set((Array.isArray(restaurants) ? restaurants : []).reduce((acc, restaurant) => {
        if (Array.isArray(restaurant.tipRestaurant)) {
            return acc.concat(restaurant.tipRestaurant);
        }
        return acc;
    }, []))];

    return (
        <div>
            <Header/>
            <div className={styles.imageContainer}>
                <img src="/Table4.jpg" alt="Placeholder" className={styles.image}/>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search your favorite restaurant...."
                        className={styles.searchBar}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleSearchKeyPress}
                    />
                    <button className={styles.filterButton} onClick={handleFilterButtonClick}>
                        <span className={`${styles.filterButtonIcon} material-icons`}>tune</span>
                    </button>
                </div>
            </div>
            <div className={styles.cityContainer}>
                <LocationOn className={styles.locationIcon}/>
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
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilterApply}
                restaurantTypes={restaurantTypes}
            />
        </div>
    );
}

export default Home;
