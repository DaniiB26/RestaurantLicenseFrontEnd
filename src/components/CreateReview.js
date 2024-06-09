import React, { useState, useEffect } from 'react';
import styles from './CreateReview.module.css';
import StarRatings from 'react-star-ratings';

const CreateReview = ({ isOpen, onClose, onSubmit, menuItems }) => {
    const initialReviewState = {
        recenzie: '',
        nota: 0,
        recomandari: [],
        splitRating: {
            food: 0,
            service: 0,
            value: 0,
            atmosphere: 0
        }
    };

    const [review, setReview] = useState(initialReviewState);
    const [useSplitRating, setUseSplitRating] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setReview(initialReviewState);
            setUseSplitRating(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSplitRatingChange = (rating, name) => {
        setReview((prevReview) => ({
            ...prevReview,
            splitRating: {
                ...prevReview.splitRating,
                [name]: rating
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

    const handleRatingChange = (newRating) => {
        setReview((prevReview) => ({
            ...prevReview,
            nota: newRating
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
                <hr className={styles.separator} />
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
                    <hr className={styles.separator} />
                    <div className={styles.formGroup}>
                        <label>Rating:</label>
                        <StarRatings
                            rating={review.nota}
                            starRatedColor="#43080e"
                            numberOfStars={5}
                            changeRating={handleRatingChange}
                            starDimension="30px"
                            starSpacing="5px"
                            name='rating'
                        />
                    </div>
                    <hr className={styles.separator} />
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
                            <hr className={styles.separator} />
                            <div className={styles.formGroup}>
                                <label>Food:</label>
                                <StarRatings
                                    rating={review.splitRating.food}
                                    starRatedColor="#43080e"
                                    numberOfStars={5}
                                    changeRating={(rating) => handleSplitRatingChange(rating, 'food')}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name='food'
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Service:</label>
                                <StarRatings
                                    rating={review.splitRating.service}
                                    starRatedColor="#43080e"
                                    numberOfStars={5}
                                    changeRating={(rating) => handleSplitRatingChange(rating, 'service')}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name='service'
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Value:</label>
                                <StarRatings
                                    rating={review.splitRating.value}
                                    starRatedColor="#43080e"
                                    numberOfStars={5}
                                    changeRating={(rating) => handleSplitRatingChange(rating, 'value')}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name='value'
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Atmosphere:</label>
                                <StarRatings
                                    rating={review.splitRating.atmosphere}
                                    starRatedColor="#43080e"
                                    numberOfStars={5}
                                    changeRating={(rating) => handleSplitRatingChange(rating, 'atmosphere')}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name='atmosphere'
                                />
                            </div>
                        </>
                    )}
                    <hr className={styles.separator} />
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
                    <hr className={styles.separator} />
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;
