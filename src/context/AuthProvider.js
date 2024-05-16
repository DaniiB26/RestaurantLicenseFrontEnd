// import React, { useCallback, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { getLogger } from "../utils";
// import { login as loginRequest } from "../requests/authService";
// import { useHistory } from "react-router-dom";
// import {
//     getReservationsByUserID,
//     getReviewsByUserID,
//     getUserById,
// } from "../requests/userService";
// import { User } from "../model/user";
//
// const log = getLogger("AuthProvider");
//
// export const AuthContext = React.createContext(null);
//
// export const AuthProvider = ({ children }) => {
//     const [state, setState] = useState({
//         isAuthenticated: !!localStorage.getItem("token"),
//         isAuthenticating: false,
//         authenticationError: null,
//         email: localStorage.getItem("email") ?? "",
//         password: "",
//         bio: "",
//         userId: localStorage.getItem("id") ?? null,
//         token: localStorage.getItem("token") ?? "",
//         reservations: [],
//         reviews: [],
//     });
//
//     const history = useHistory();
//     const {
//         isAuthenticated,
//         isAuthenticating,
//         authenticationError,
//         email,
//         password,
//         userId,
//         bio,
//         token,
//         reservations,
//         reviews,
//     } = state;
//
//     useEffect(() => {
//         const getUserDetails = async () => {
//             if (userId) {
//                 const reservationsList = await getReservationsByUserID(userId);
//                 const reviewsList = await getReviewsByUserID(userId);
//                 setState((prevState) => ({
//                     ...prevState,
//                     reservations: reservationsList,
//                     reviews: reviewsList,
//                 }));
//             }
//         };
//
//         getUserDetails();
//     }, [userId]);
//
//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             const response = await getUserById(userId);
//             const { bio } = response;
//             setState((prevState) => ({ ...prevState, bio }));
//         };
//         if (userId) {
//             fetchUserInfo();
//         }
//     }, [userId]);
//
//     const login = useCallback((email, password) => {
//         loginCallback(email, password);
//     }, []);
//
//     const logout = useCallback(() => {
//         localStorage.setItem("token", "");
//         localStorage.setItem("email", "");
//         localStorage.setItem("id", "");
//         setState((prevState) => ({
//             ...prevState,
//             isAuthenticated: false,
//             isAuthenticating: false,
//             token: "",
//             email: "",
//             password: "",
//         }));
//         history.push("/login");
//     }, [state]);
//
//     useEffect(() => {
//         let canceled = false;
//
//         const authenticate = async () => {
//             if (!isAuthenticating) {
//                 log("authenticate, !isAuthenticating, return");
//                 return;
//             }
//             try {
//                 log("authenticate...");
//                 setState((prevState) => ({
//                     ...prevState,
//                     isAuthenticating: true,
//                 }));
//                 const { email, password } = state;
//                 const authToken = await loginRequest(email, password);
//                 const response = await getUserById(authToken.userId);
//                 log("EMAIL " + email);
//                 log("ID " + response.id);
//                 log(response);
//                 if (canceled) {
//                     return;
//                 }
//                 log("authenticate succeeded" + response.id);
//                 setState((prevState) => ({
//                     ...prevState,
//                     userId: response.id,
//                     token: authToken.token,
//                     isAuthenticated: true,
//                     isAuthenticating: false,
//                 }));
//                 localStorage.setItem("token", authToken.token);
//                 localStorage.setItem("email", email);
//                 localStorage.setItem("id", response.id);
//             } catch (error) {
//                 if (canceled) {
//                     return;
//                 }
//                 log("authenticate failed");
//                 setState((prevState) => ({
//                     ...prevState,
//                     authenticationError: error,
//                     isAuthenticating: false,
//                 }));
//             }
//         };
//
//         authenticate();
//         return () => {
//             canceled = true;
//         };
//     }, [isAuthenticating, state]);
//
//     const value = {
//         isAuthenticated,
//         login,
//         logout,
//         isAuthenticating,
//         authenticationError,
//         token,
//         email,
//         password,
//         userId,
//         bio,
//         reservations,
//         reviews,
//     };
//
//     log("render");
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
//
//     function loginCallback(email, password) {
//         log("login");
//         setState((prevState) => ({
//             ...prevState,
//             isAuthenticating: true,
//             email,
//             password,
//         }));
//     }
// };
//
// AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };