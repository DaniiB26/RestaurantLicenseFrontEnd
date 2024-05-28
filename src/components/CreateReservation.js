import React, { useState } from 'react';
import styles from './CreateReservation.module.css';

const CreateReservation = ({ onSubmit, restaurantId }) => {
    const [reservation, setReservation] = useState({
        data_rezervare: '',
        numar_persoane: 1,
        specificatii: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevReservation) => ({
            ...prevReservation,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...reservation, restaurant_id: restaurantId });
    };

    return (
        <div className={styles.reservationForm}>
            <h2>Create Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Reservation Date:</label>
                    <input
                        type="datetime-local"
                        name="data_rezervare"
                        value={reservation.data_rezervare}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Number of People:</label>
                    <input
                        type="number"
                        name="numar_persoane"
                        value={reservation.numar_persoane}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Specifications:</label>
                    <textarea
                        name="specificatii"
                        value={reservation.specificatii}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default CreateReservation;
