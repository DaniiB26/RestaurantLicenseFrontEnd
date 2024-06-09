import React from 'react';
import StarRatings from "react-star-ratings";
import styles from './CardReview.module.css';

const CardReview = ({ review }) => {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewQuote}>&ldquo;</div>
            <div className={styles.reviewContent}>
                <div className={styles.reviewUser}>{review.userName}</div>
                <div className={styles.reviewText}>{review.recenzie}</div>
                <div className={styles.reviewRating}>
                    <StarRatings
                        rating={review.nota}
                        starRatedColor="#43080e"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        name='rating'
                    />
                </div>
                <div className={styles.reviewDate}>{new Date(review.data).toLocaleDateString()}</div>
                <div className={styles.reviewRecomandari}>
                    <strong>Recomandari:</strong>
                    <ul>
                        {review.recomandari.map((item, index) => (
                            <li key={index}>{item.preparat}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/*<div className={styles.reviewActions}>*/}
            {/*    <div className={styles.likes}>*/}
            {/*        👍 <span>{review.likes}</span>*/}
            {/*    </div>*/}
            {/*    <div className={styles.dislikes}>*/}
            {/*        👎 <span>{review.dislikes}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default CardReview;
