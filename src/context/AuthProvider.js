import React, { createContext, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../requests/authService';
import { getLogger } from '../utils';
import { getUserByEmail } from "../requests/userService";

const log = getLogger('AuthProvider');

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuthenticated: !!localStorage.getItem('token'),
        isAuthenticating: false,
        authenticationError: null,
        email: localStorage.getItem('email') ?? '',
        password: '',
        userId: localStorage.getItem('id') ?? null,
        token: localStorage.getItem('token') ?? '',
        user: null,
        fullName: '',
    });

    const { isAuthenticated, isAuthenticating, authenticationError, email, password, userId, token, user, fullName } = state;
    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
            getUserByEmail(email).then((userData) => {
                setState((prevState) => ({
                    ...prevState,
                    user: userData,
                    fullName: userData.fullName,
                }));
            }).catch((error) => {
                log('getUserByEmail failed', error);
            });
        }
    }, [email]);

    const login = useCallback(async (email, password) => {
        log('login');
        setState((prevState) => ({
            ...prevState,
            isAuthenticating: true,
            authenticationError: null,
        }));

        try {
            const authToken = await loginRequest(email, password);
            log('login succeeded');

            setState((prevState) => ({
                ...prevState,
                isAuthenticated: true,
                isAuthenticating: false,
                token: authToken.token,
                userId: authToken.userId,
                email,
            }));

            localStorage.setItem('token', authToken.token);
            localStorage.setItem('email', email);
            localStorage.setItem('id', authToken.userId);
            navigate("/home");  // Redirecționare după autentificare

            // Obține datele utilizatorului după autentificare
            const userData = await getUserByEmail(email);
            setState((prevState) => ({
                ...prevState,
                user: userData,
                fullName: userData.fullName,
            }));
        } catch (error) {
            log('login failed');
            setState((prevState) => ({
                ...prevState,
                isAuthenticating: false,
                authenticationError: error,
            }));
        }
    }, [navigate]);

    const logout = useCallback(() => {
        log('logout');
        setState({
            isAuthenticated: false,
            isAuthenticating: false,
            authenticationError: null,
            email: '',
            password: '',
            userId: null,
            token: '',
            user: null,
            fullName: '',
        });
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        navigate("/home");  // Redirecționare după deconectare
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAuthenticating, login, logout, authenticationError, user, fullName }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
