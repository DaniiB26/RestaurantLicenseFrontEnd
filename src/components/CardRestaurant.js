import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './CardRestaurant.module.css';

const CardRestaurant = ({ restaurant, onClick }) => {
    return (
        <Box className={styles.card} onClick={onClick}>
            <Box className={styles.imageContainer}>
                {restaurant.meniu && restaurant.meniu.length > 0 && (
                    <img src={restaurant.thumbnail} alt={restaurant.nume} className={styles.image} />
                )}
                <Box className={styles.logoContainer}>
                    <img src={restaurant.logo} alt="Logo" className={styles.logo} />
                </Box>
            </Box>
            <Box className={styles.infoContainer}>
                <Typography variant="subtitle1" className={styles.restaurantName}>
                    {restaurant.nume}
                </Typography>
                <Typography variant="body2" className={styles.rating}>
                    {restaurant.rating_mediu.toFixed(1)}
                </Typography>
            </Box>
        </Box>
    );
};

export default CardRestaurant;
