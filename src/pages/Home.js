import React from "react";

const Home = ({ restaurants }) => {
    return (
        <div>
            <h1>Welcome!!!</h1>
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
