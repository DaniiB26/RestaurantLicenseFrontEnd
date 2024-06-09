import React, { useState } from 'react';
import styles from './CreateReservation.module.css';
import { Modal, Box, Typography, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addMinutes, setHours, setMinutes, isBefore } from 'date-fns';

const CreateReservation = ({ onSubmit, restaurantId }) => {
    const [reservation, setReservation] = useState({
        dataRezervare: new Date(),
        numarPersoane: 1,
        specificatii: ''
    });
    const [open, setOpen] = useState(false);

    const handleDateChange = (date) => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            dataRezervare: date,
        }));
    };

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
            dataRezervare: new Date(),
            numarPersoane: 1,
            specificatii: ''
        });
    };

    const handleClose = () => setOpen(false);

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <div className={styles.reservationForm}>
            <h2>Create Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Reservation Date:</label>
                    <DatePicker
                        selected={reservation.dataRezervare}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeIntervals={30}
                        minDate={new Date()}
                        filterTime={filterPassedTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className={styles.datePicker}
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
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Specifications:</label>
                    <textarea
                        name="specificatii"
                        value={reservation.specificatii}
                        onChange={handleChange}
                        className={styles.textArea}
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
                    <Button onClick={handleClose} sx={{ mt: 2, backgroundColor: '#43080e' }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateReservation;
