import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider"; // Asigură-te că importul este corect

const Home = ({ restaurants }) => {
    const { user } = useContext(AuthContext); // Obține utilizatorul autentificat din context

    return (
        <div>
            <h1>Welcome!!!</h1>
            {user && <h2>Logged in as: {user.email}</h2>} {/* Afișează email-ul utilizatorului autentificat */}
            {restaurants && restaurants.map((restaurant) => (
                <div key={restaurant.id}> {/* Presupunând că fiecare restaurant are un 'id' unic */}
                    <h2>{restaurant.nume}</h2> {/* Afisare nume restaurant */}
                    {/* Verifica daca exista meniu si daca meniul are cel putin un element */}
                    {restaurant.meniu && restaurant.meniu.length > 0 && (
                        <img src={restaurant.meniu[0].imagine} alt="Meniu" style={{ width: '100px' }} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Home;
