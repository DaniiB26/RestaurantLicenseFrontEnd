import React, { useState, useEffect } from 'react';
import ProfileDetails from './ProfileDetails';
import ReservationList from './ReservationList';
import ReviewList from './ReviewList';
import styles from './UserProfile.module.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, reservations, reviews, restaurant }) => {
    const [activeTab, setActiveTab] = useState('reservations');
    const navigate = useNavigate();

    // Log the user and restaurant objects to the console
    useEffect(() => {
        console.log("User object:", user);
        console.log("Restaurant object:", restaurant);
    }, [user, restaurant]);

    const handleManageRestaurantClick = (restaurantId) => {
        if (restaurantId) {
            navigate(`/manage-restaurant/${restaurantId}`);
        }
    };

    return (
        <div className={styles.userProfile}>
            <div className={styles.header}>
                {user && <ProfileDetails user={user} />}
                {restaurant && user && user.id === restaurant.managerId && (
                    <button onClick={() => handleManageRestaurantClick(restaurant.id)} className={styles.manageButton}>
                        Manage {restaurant.nume}
                    </button>
                )}
            </div>
            <div className={styles.tabs}>
                <button onClick={() => setActiveTab('reservations')}>Reservations</button>
                <button onClick={() => setActiveTab('reviews')}>Reviews</button>
            </div>
            <div className={styles.content}>
                {activeTab === 'reservations' && <ReservationList reservations={reservations} />}
                {activeTab === 'reviews' && <ReviewList reviews={reviews} />}
            </div>
        </div>
    );
};

export default UserProfile;
