import React, { useState } from 'react';
import styles from './FilterModal.module.css';
import { IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

const FilterModal = ({ isOpen, onClose, onApply, restaurantTypes }) => {
    const [filters, setFilters] = useState({
        tip_restaurant: [],
        rating_mediu: 0,
        pret: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: checked ? [...prevFilters[name], value] : prevFilters[name].filter(item => item !== value)
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value,
            }));
        }
    };

    const handlePriceChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            pret: value
        }));
    };

    const handleRatingChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            rating_mediu: value
        }));
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>x</button>
                <h2 className={styles.title}>Filter Restaurants</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tip Restaurant:</label>
                    <div className={styles.checkboxGroup}>
                        {restaurantTypes.map((type, index) => (
                            <label key={index} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="tip_restaurant"
                                    value={type}
                                    onChange={handleChange}
                                    className={styles.checkbox}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Average Rating:</label>
                    <div className={styles.ratingButtons}>
                        <button
                            type="button"
                            className={`${styles.ratingButton} ${filters.rating_mediu === 0 ? styles.active : ''}`}
                            onClick={() => handleRatingChange(0)}
                        >
                            Any
                        </button>
                        <button
                            type="button"
                            className={`${styles.ratingButton} ${filters.rating_mediu === 4.3 ? styles.active : ''}`}
                            onClick={() => handleRatingChange(4.3)}
                        >
                            4.3+
                        </button>
                        <button
                            type="button"
                            className={`${styles.ratingButton} ${filters.rating_mediu === 4.5 ? styles.active : ''}`}
                            onClick={() => handleRatingChange(4.5)}
                        >
                            4.5+
                        </button>
                        <button
                            type="button"
                            className={`${styles.ratingButton} ${filters.rating_mediu === 4.7 ? styles.active : ''}`}
                            onClick={() => handleRatingChange(4.7)}
                        >
                            4.7+
                        </button>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Price:</label>
                    <div className={styles.priceButtons}>
                        <button
                            type="button"
                            className={`${styles.priceButton} ${filters.pret === 0 ? styles.active : ''}`}
                            onClick={() => handlePriceChange(0)}
                        >
                            <BlockIcon/>
                        </button>
                        <button
                            type="button"
                            className={`${styles.priceButton} ${filters.pret === 1 ? styles.active : ''}`}
                            onClick={() => handlePriceChange(1)}
                        >
                            Cheap
                        </button>
                        <button
                            type="button"
                            className={`${styles.priceButton} ${filters.pret === 2 ? styles.active : ''}`}
                            onClick={() => handlePriceChange(2)}
                        >
                            Moderate
                        </button>
                        <button
                            type="button"
                            className={`${styles.priceButton} ${filters.pret === 3 ? styles.active : ''}`}
                            onClick={() => handlePriceChange(3)}
                        >
                            Expensive
                        </button>
                        <button
                            type="button"
                            className={`${styles.priceButton} ${filters.pret === 4 ? styles.active : ''}`}
                            onClick={() => handlePriceChange(4)}
                        >
                            Extravagant
                        </button>
                    </div>
                </div>
                <button className={styles.applyButton} onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};

export default FilterModal;
