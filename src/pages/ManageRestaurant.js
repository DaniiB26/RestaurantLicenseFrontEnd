// src/components/ManageRestaurant.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../requests/restaurantService';
import { getReservationsByRestaurantId, updateReservationStatus, rateUserForReservation } from '../requests/reservationService';
import styles from './ManageRestaurant.module.css';
import ReservationCard from "../components/ReservationCard";
import Header from "../components/Header";

const ManageRestaurant = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = await getRestaurantById(restaurantId);
                setRestaurant(restaurantData);

                const reservationsData = await getReservationsByRestaurantId(restaurantId);
                console.log('Fetched Reservations:', reservationsData);
                setReservations(reservationsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [restaurantId]);

    const handleStatusChange = async (reservationId, newStatus) => {
        try {
            const updatedReservation = await updateReservationStatus(reservationId, newStatus);
            setReservations(reservations.map(reservation =>
                reservation.id === reservationId ? updatedReservation : reservation
            ));
        } catch (error) {
            console.error('Error updating reservation status:', error);
        }
    };

    const handleRateUser = async (reservationId, rating) => {
        try {
            // Trimite evaluarea către backend
            await rateUserForReservation(reservationId, rating);

            // Actualizează rezervarea pentru a seta `isRated` la `true`
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation.id === reservationId ? { ...reservation, isRated: true } : reservation
                )
            );
        } catch (error) {
            console.error('Error rating user:', error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className={styles.manageRestaurant}>
                <h1>Manage Restaurant: {restaurant.nume}</h1>
                <div className={styles.reservations}>
                    <h2>Confirmed Reservations</h2>
                    {reservations.filter(reservation => reservation.status === 'confirmed').length === 0 ? (
                        <p>No confirmed reservations.</p>
                    ) : (
                        reservations.filter(reservation => reservation.status === 'confirmed').map(reservation => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onStatusChange={handleStatusChange}
                                onRateUser={handleRateUser}
                            />
                        ))
                    )}
                    <h2>Pending Reservations</h2>
                    {reservations.filter(reservation => reservation.status === 'Pending').length === 0 ? (
                        <p>No pending reservations.</p>
                    ) : (
                        reservations.filter(reservation => reservation.status === 'Pending').map(reservation => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    )}
                    <h2>Cancelled Reservations</h2>
                    {reservations.filter(reservation => reservation.status === 'cancelled').length === 0 ? (
                        <p>No cancelled reservations.</p>
                    ) : (
                        reservations.filter(reservation => reservation.status === 'cancelled').map(reservation => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageRestaurant;
