import React, { useEffect, useState, useContext } from 'react';
import UserProfile from '../components/UserProfile';
import styles from './ProfilePage.module.css';
import { AuthContext } from '../context/AuthProvider';
import { getReservationsByUserId } from "../requests/reservationService";
import { getReviewsByUserId } from "../requests/reviewService";
import { getRestaurantByManagerId } from "../requests/restaurantService";  // Import the new function
import Header from "../components/Header";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [restaurant, setRestaurant] = useState(null); // Add this state

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user && user.id) {
                    const reservationsData = await getReservationsByUserId(user.id);
                    setReservations(reservationsData);

                    const reviewsData = await getReviewsByUserId(user.id);
                    setReviews(reviewsData);

                    // Fetch the restaurant managed by the user
                    const restaurantData = await getRestaurantByManagerId(user.id);
                    setRestaurant(restaurantData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div>
            <Header />
            <div className={styles.profilePage}>
                <UserProfile user={user} reservations={reservations} reviews={reviews} restaurant={restaurant} />
            </div>
        </div>
    );
};

export default ProfilePage;
