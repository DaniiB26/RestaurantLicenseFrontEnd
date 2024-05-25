import React, { createContext, useState, useContext } from 'react';

const CityContext = createContext();

export const useCity = () => {
    return useContext(CityContext);
};

export const CityProvider = ({ children }) => {
    const [city, setCity] = useState("");

    return (
        <CityContext.Provider value={{ city, setCity }}>
            {children}
        </CityContext.Provider>
    );
};
