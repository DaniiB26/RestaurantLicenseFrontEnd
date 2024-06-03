import React, { useState } from 'react';
import styles from './FilterModal.module.css';

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

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>x</button>
                <h2>Filter Restaurants</h2>
                <div className={styles.formGroup}>
                    <label>Tip Restaurant:</label>
                    <div>
                        {restaurantTypes.map((type, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="tip_restaurant"
                                    value={type}
                                    onChange={handleChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label>Rating Mediu:</label>
                    <input
                        type="number"
                        name="rating_mediu"
                        min="0"
                        max="5"
                        step="0.1"
                        value={filters.rating_mediu}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Pret:</label>
                    <input
                        type="number"
                        name="pret"
                        min="1"
                        max="4"
                        value={filters.pret}
                        onChange={handleChange}
                    />
                </div>
                <button className={styles.applyButton} onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};

export default FilterModal;
