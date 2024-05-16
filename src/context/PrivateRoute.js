// import React, { useContext } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AuthContext } from "./AuthProvider";
// import { getLogger } from "../utils";
//
// const log = getLogger("PrivateRoute");
//
// export const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { isAuthenticated } = useContext(AuthContext);
//     log("render, isAuthenticated", isAuthenticated);
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//             }
//         />
//     );
// };