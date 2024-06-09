import React from 'react';
import styles from './ReservationList.module.css';

const ReservationList = ({ reservations }) => {
    return (
        <div className={styles.reservationList}>
            <h2>Recent Reservations</h2>
            <div className={styles.gridContainer}>
                {reservations.map((reservation, index) => (
                    <div key={index} className={styles.reservationItem}>
                        <p><strong>Restaurant:</strong> {reservation.restaurantName}</p>
                        <p><strong>Date:</strong> {new Date(reservation.dataRezervare).toLocaleString()}</p>
                        <p><strong>Status:</strong> {reservation.status}</p>
                        <p><strong>Number of People:</strong> {reservation.numarPersoane}</p>
                        <p><strong>Specifications:</strong> {reservation.specificatii}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationList;
