import React from 'react';
import styles from './ReservationList.module.css';

const ReservationList = ({ reservations }) => {
    return (
        <div className={styles.reservationList}>
            <h2>Recent Reservations</h2>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={index} className={styles.reservationItem}>
                        <p><strong>Restaurant:</strong> {reservation.restaurant_id}</p>
                        <p><strong>Date:</strong> {new Date(reservation.data_rezervare).toLocaleString()}</p>
                        <p><strong>Status:</strong> {reservation.status}</p>
                        <p><strong>Number of People:</strong> {reservation.numar_persoane}</p>
                        <p><strong>Specifications:</strong> {reservation.specificatii}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;
