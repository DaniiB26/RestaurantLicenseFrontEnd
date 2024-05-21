import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../requests/authService';
import { AuthContext } from '../context/AuthProvider';
import {
    Container,
    CssBaseline,
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Link
} from '@mui/material';
import styles from './Register.module.css';

export default function Register() {
    const { register, handleSubmit, getValues } = useForm();
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        if (data.passwordHash !== data.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            await registerRequest(data);
            if (login) {
                login(data.email, data.passwordHash);
            }
            navigate('/');
        } catch (error) {
            console.error('Error during registration or login:', error);
            setError(error.message);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.card}>
                <img src="/RestaurantImage.png" alt="Registration Info" className={styles.img} />
                <div className={styles.cardContent}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5" className={styles.title}>
                        Sign Up
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <TextField
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            autoComplete="name"
                            {...register('fullName')}
                            className={styles.textField}
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            {...register('email')}
                            className={styles.textField}
                        />
                        <TextField
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            autoComplete="tel"
                            {...register('phoneNumber')}
                            className={styles.textField}
                        />
                        <TextField
                            required
                            fullWidth
                            id="passwordHash"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            {...register('passwordHash')}
                            className={styles.textField}
                        />
                        <TextField
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="new-password"
                            {...register('confirmPassword', {
                                validate: (value) => value === getValues('passwordHash') || 'Passwords do not match'
                            })}
                            className={styles.textField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={styles.button}
                        >
                            Register
                        </Button>
                        <Link href="/login" variant="body2" className={styles.link}>
                            Already have an account? Sign in
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
