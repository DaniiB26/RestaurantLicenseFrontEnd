// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RestaurantLayout from "./components/RestaurantLayout";
import CityRestaurants from './components/CityRestaurants';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<RestaurantLayout />}>
            <Route path="city/:city" element={<CityRestaurants />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
