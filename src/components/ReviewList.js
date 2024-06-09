import React from 'react';
import StarRatings from "react-star-ratings";
import styles from './ReviewList.module.css';

const ReviewList = ({ reviews }) => {
    return (
        <div className={styles.reviewList}>
            <h2>User Reviews</h2>
            <div className={styles.gridContainer}>
                {reviews.map((review, index) => (
                    <div key={index} className={styles.reviewItem}>
                        <p><strong>Restaurant:</strong> {review.restaurantId}</p>
                        <p><strong>Date:</strong> {new Date(review.data).toLocaleString()}</p>
                        <p><strong>Review:</strong> {review.recenzie}</p>
                        <div className={styles.ratingContainer}>
                            <StarRatings
                                rating={review.nota}
                                starRatedColor="#43080e"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                                name='rating'
                            />
                        </div>
                        {review.recomandari && review.recomandari.length > 0 && (
                            <div className={styles.recomandari}>
                                <strong>Recomandari:</strong>
                                <ul>
                                    {review.recomandari.map((item, idx) => (
                                        <li key={idx}>{item.preparat}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
