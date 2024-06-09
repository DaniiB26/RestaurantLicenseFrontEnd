import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../requests/authService';
import { AuthContext } from '../context/AuthProvider';
import {
    CssBaseline,
    Typography,
    TextField,
    Button,
    Link,
    Alert // Import Alert component from Material UI
} from '@mui/material';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginRequest(email, password);
            login(email, password);
            navigate('/city/Brașov');
        } catch (error) {
            console.error('Error during login:', error);
            setError('Email or password are invalid!'); // Set error message
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.card}>
                <img src="/RestaurantImage.png" alt="Login Info" className={styles.img} />
                <div className={styles.cardContent}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5" className={styles.title}>
                        Login
                    </Typography>
                    {error && <Alert severity="error" className={styles.alert}>{error}</Alert>} {/* Display error message */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.textField}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.textField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={styles.button}
                        >
                            Login
                        </Button>
                    </form>
                    <Link href="/register" variant="body2" className={styles.link}>
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
