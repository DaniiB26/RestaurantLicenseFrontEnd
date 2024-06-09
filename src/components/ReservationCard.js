import React, { useState } from 'react';
import styles from './ReservationCard.module.css';
import ClientRating from './ClientRating';
import { createNotification } from '../requests/notificationService';

const ReservationCard = ({ reservation, onStatusChange, onRateUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChangeStatus = async (newStatus) => {
        try {
            await onStatusChange(reservation.id, newStatus);
            const message = newStatus === 'confirmed'
                ? `Your reservation at ${reservation.restaurantName} has been confirmed.`
                : `Your reservation at ${reservation.restaurantName} has been cancelled.`;
            await createNotification(reservation.userId, message);
        } catch (error) {
            console.error('Error changing status:', error);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitRating = async (rating) => {
        try {
            await onRateUser(reservation.id, rating);
            reservation.isRated = true;
        } catch (error) {
            console.error('Error rating user:', error);
        }
        handleCloseModal();
    };

    const renderUserRating = () => {
        if (reservation.userAvgGrade !== undefined && reservation.userAvgGrade !== -1) {
            return reservation.userAvgGrade.toFixed(2);
        }
        return 'Not yet rated';
    };

    return (
        <div className={styles.reservationCard}>
            <div className={styles.cardHeader}>
                <h3>Reservation Details</h3>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.userName}><strong>User:</strong> {reservation.userFullName}</span>
                <span className={styles.userRating}>
                    <strong>User Rating:</strong>
                    {renderUserRating()}
                </span>
            </div>
            <hr className={styles.separator} />
            <div className={styles.cardContent}>
                <p><strong>Date:</strong> {new Date(reservation.dataRezervare).toLocaleString()}</p>
                <p><strong>Guests:</strong> {reservation.numarPersoane}</p>
                <p><strong>Specifications:</strong> {reservation.specificatii}</p>
                <p><strong>Status:</strong> <span className={`${styles.status} ${styles[reservation.status.toLowerCase()]}`}>{reservation.status}</span></p>
                {reservation.status === 'Pending' && (
                    <div className={styles.buttons}>
                        <button className={styles.confirmButton} onClick={() => handleChangeStatus('confirmed')}>Confirm</button>
                        <button className={styles.cancelButton} onClick={() => handleChangeStatus('cancelled')}>Cancel</button>
                    </div>
                )}
                {reservation.status === 'confirmed' && (
                    <div className={styles.ratingSection}>
                        {reservation.isRated ? (
                            <p>Client has been evaluated</p>
                        ) : (
                            <button onClick={handleOpenModal} className={styles.evaluateButton}>Evaluate Client</button>
                        )}
                    </div>
                )}
            </div>
            <ClientRating
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitRating}
            />
        </div>
    );
};

export default ReservationCard;
