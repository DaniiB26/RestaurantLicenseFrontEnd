import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import RestaurantLayout from "./components/RestaurantLayout";
import CityRestaurants from './components/CityRestaurants';
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./context/PrivateRoute";
import Register from "./pages/Register";

function App() {
    return (
        <AuthProvider>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute component={RestaurantLayout} />}>
                            <Route path="city/:city" element={<CityRestaurants />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
        </AuthProvider>
    );
}

export default App;
