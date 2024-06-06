import React, { useState } from 'react';
import styles from './CreateReservation.module.css';
import { Modal, Box, Typography, Button } from '@mui/material';

const CreateReservation = ({ onSubmit, restaurantId }) => {
    const [reservation, setReservation] = useState({
        dataRezervare: '',
        numarPersoane: 1,
        specificatii: ''
    });
    const [open, setOpen] = useState(false);

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
        setOpen(true);
        resetForm();
    };

    const resetForm = () => {
        setReservation({
            dataRezervare: '',
            numarPersoane: 1,
            specificatii: ''
        });
    };

    const handleClose = () => setOpen(false);

    return (
        <div className={styles.reservationForm}>
            <h2>Create Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Reservation Date:</label>
                    <input
                        type="datetime-local"
                        name="dataRezervare"
                        value={reservation.dataRezervare}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Number of People:</label>
                    <input
                        type="number"
                        name="numarPersoane"
                        value={reservation.numarPersoane}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="reservation-success-title"
                aria-describedby="reservation-success-description"
            >
                <Box className={styles.modalBox}>
                    <Typography id="reservation-success-title" variant="h6" component="h2">
                        Reservation Sent
                    </Typography>
                    <Typography id="reservation-success-description" sx={{ mt: 2 }}>
                        Your reservation has been sent. Please wait for confirmation.
                    </Typography>
                    <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateReservation;
