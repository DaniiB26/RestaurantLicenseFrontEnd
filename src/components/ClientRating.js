// src/components/ClientRating.js
import React, { useState } from 'react';
import styles from './ClientRating.module.css';
import StarRatings from 'react-star-ratings';

const ClientRating = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        onSubmit(rating);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>x</button>
                <h2>Evaluate Client</h2>
                <StarRatings
                    rating={rating}
                    starRatedColor="#43080e"
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="2px"
                    changeRating={handleRatingChange}
                    name='rating'
                />
                <button onClick={handleSubmit} className={styles.submitButton}>Submit Rating</button>
            </div>
        </div>
    );
};

export default ClientRating;
