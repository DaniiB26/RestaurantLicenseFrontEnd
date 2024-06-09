import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../requests/restaurantService';
import { getReservationsByRestaurantId, updateReservationStatus } from '../requests/reservationService';
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
                console.log('Fetched Restaurants:', restaurantData);  // Adaugă acest log
                setRestaurant(restaurantData);

                const reservationsData = await getReservationsByRestaurantId(restaurantId);
                console.log('Fetched Reservations:', reservationsData);  // Adaugă acest log
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className={styles.manageRestaurant}>
                <h1>Manage Restaurant</h1>
                <div className={styles.reservationsContainer}>
                    <div className={styles.reservationColumn}>
                        <h2>Confirmed Reservations</h2>
                        {reservations.filter(reservation => reservation.status === 'confirmed').length === 0 ? (
                            <p>No confirmed reservations.</p>
                        ) : (
                            reservations.filter(reservation => reservation.status === 'confirmed').map(reservation => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onStatusChange={handleStatusChange}
                                />
                            ))
                        )}
                    </div>
                    <div className={styles.reservationColumn}>
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
                    </div>
                    <div className={styles.reservationColumn}>
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
        </div>
    );
};

export default ManageRestaurant;
