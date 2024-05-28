import React, { useState } from 'react';
import styles from './CreateReview.module.css'; // Asigură-te că adaugi stilurile necesare pentru modal

const CreateReview = ({ isOpen, onClose, onSubmit, menuItems }) => {
    const [review, setReview] = useState({
        recenzie: '',
        nota: 0,
        recomandari: [],
        splitRating: {
            food: 0,
            service: 0,
            value: 0,
            atmosphere: 0
        }
    });
    const [useSplitRating, setUseSplitRating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSplitRatingChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            splitRating: {
                ...prevReview.splitRating,
                [name]: value
            }
        }));
    };

    const handleRecomandariChange = (e) => {
        const options = e.target.options;
        const selectedItems = [];
        for (const option of options) {
            if (option.selected) {
                selectedItems.push(JSON.parse(option.value));
            }
        }
        setReview((prevReview) => ({
            ...prevReview,
            recomandari: selectedItems
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(review);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>x</button>
                <h2>Add Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Review:</label>
                        <textarea
                            name="recenzie"
                            value={review.recenzie}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Rating:</label>
                        <input
                            type="number"
                            name="nota"
                            value={review.nota}
                            onChange={handleChange}
                            min="0"
                            max="5"
                            step="0.1"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Use split rating:</label>
                        <input
                            type="checkbox"
                            checked={useSplitRating}
                            onChange={() => setUseSplitRating(!useSplitRating)}
                        />
                    </div>
                    {useSplitRating && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Food:</label>
                                <input
                                    type="number"
                                    name="food"
                                    value={review.splitRating.food}
                                    onChange={handleSplitRatingChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Service:</label>
                                <input
                                    type="number"
                                    name="service"
                                    value={review.splitRating.service}
                                    onChange={handleSplitRatingChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Value:</label>
                                <input
                                    type="number"
                                    name="value"
                                    value={review.splitRating.value}
                                    onChange={handleSplitRatingChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Atmosphere:</label>
                                <input
                                    type="number"
                                    name="atmosphere"
                                    value={review.splitRating.atmosphere}
                                    onChange={handleSplitRatingChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className={styles.formGroup}>
                        <label>Recomandari:</label>
                        <select
                            name="recomandari"
                            value={review.recomandari.map(item => JSON.stringify(item))}
                            onChange={handleRecomandariChange}
                            multiple
                            className={styles.dropdown}
                        >
                            {menuItems.map((item, index) => (
                                <option key={index} value={JSON.stringify(item)}>{item.preparat}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;
