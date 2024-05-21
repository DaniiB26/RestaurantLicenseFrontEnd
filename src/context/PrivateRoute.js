import React, { useContext } from "react";
import { Redirect, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { getLogger } from "../utils";

const log = getLogger("PrivateRoute");
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};
