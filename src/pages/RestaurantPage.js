import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styles from './RestaurantPage.module.css';
import { getRestaurantByName } from "../requests/restaurantService";
import Header from "../components/Header";
import StarRatings from "react-star-ratings";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const RestaurantPage = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurantByName(name);
                console.log('Response data:', data);
                setRestaurant(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [name]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMenuClick = (section) => {
        setActiveSection(section);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!restaurant) {
        return <div>Restaurant not found</div>;
    }

    const priceRange = "$".repeat(restaurant.pret);

    const Modal = ({ isOpen, onClose, images }) => {
        if (!isOpen) return null;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>x</button>
                    <h2>{restaurant.nume}</h2>
                    <div className={styles.imageGallery}>
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Restaurant Photo ${index + 1}`} className={styles.modalImage} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header/>
            <div className={styles.menuContainer}>
                <nav className={styles.menu}>
                    <ul>
                        <li>
                            <button onClick={() => handleMenuClick('overview')}>Overview</button>
                        </li>
                        <li>
                            <button onClick={() => handleMenuClick('menu')}>Menu</button>
                        </li>
                        <li>
                            <button onClick={() => handleMenuClick('reviews')}>Reviews</button>
                        </li>
                        <li>
                            <button onClick={() => handleMenuClick('reserve')}>Reserve</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.contentContainer}>
                <div className={`${styles.section} ${activeSection === 'overview' ? styles.active : ''}`} id="overview">
                    <div className={styles.overviewContent}>
                        <div className={styles.overviewContainer}>
                            {restaurant.logo && restaurant.logo.length > 0 && (
                                <img src={restaurant.logo} alt="Restaurant Overview" className={styles.overviewImage}/>
                            )}
                            <div className={styles.overviewDetails}>
                                <h2>{restaurant.nume}</h2>
                                <p>{restaurant.program}</p>
                                <p>{restaurant.site_web}</p>
                                <p>{restaurant.telefon}</p>
                            </div>
                        </div>
                        <div className={styles.cardsContainer}>
                            <div className={styles.card}>
                                <div className={styles.rating}>
                                    <h2>RATINGS</h2>
                                    <div className={styles.stars}>
                                        <StarRatings
                                            rating={restaurant.rating_mediu}
                                            starRatedColor="#43080e"
                                            numberOfStars={5}
                                            starDimension="30px"
                                            starSpacing="2px"
                                            name='rating'
                                        />
                                    </div>
                                    <hr/>
                                    <ul>
                                        <li>Food <div className={styles.ratingStars}><StarRatings
                                            rating={restaurant.ratings.food} starRatedColor="#43080e" numberOfStars={5}
                                            starDimension="15px" starSpacing="2px" name='food'/></div></li>
                                        <li>Service <div className={styles.ratingStars}><StarRatings
                                            rating={restaurant.ratings.service} starRatedColor="#43080e"
                                            numberOfStars={5} starDimension="15px" starSpacing="2px" name='service'/>
                                        </div></li>
                                        <li>Value <div className={styles.ratingStars}><StarRatings
                                            rating={restaurant.ratings.value} starRatedColor="#43080e" numberOfStars={5}
                                            starDimension="15px" starSpacing="2px" name='value'/></div></li>
                                        <li>Atmosphere <div className={styles.ratingStars}><StarRatings
                                            rating={restaurant.ratings.atmosphere} starRatedColor="#43080e"
                                            numberOfStars={5} starDimension="15px" starSpacing="2px" name='atmosphere'/>
                                        </div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <h2>Details</h2>
                                <hr/>
                                <p><strong>CUISINES</strong><br/>{restaurant.tip_restaurant.join(', ')}</p>
                                <p><strong>SPECIAL DIETS</strong><br/>{restaurant.special_diets.join(', ')}</p>
                                <p><strong>MEALS</strong><br/>{restaurant.meals.join(', ')}</p>
                                <p><strong>FEATURES</strong><br/>{restaurant.features.join(', ')}</p>
                                <hr/>
                                <button className={styles.viewPhotosButton} onClick={handleOpenModal}>View Photos
                                </button>
                            </div>
                            <div className={styles.card}>
                                <h2>Location</h2>
                                <hr/>
                                <APIProvider apiKey={'AIzaSyC1BKTNIBz_R352_ckftdUyoSXbJLBQbOo'}>
                                    <Map
                                        defaultCenter={{
                                            lat: restaurant.coordonate.latitudine,
                                            lng: restaurant.coordonate.longitudine
                                        }}
                                        defaultZoom={15}
                                        style={{width: '21vw', height: '30vh', marginLeft: '1vw', borderRadius: '4px'}}
                                        gestureHandling={'greedy'}
                                        disableDefaultUI={true}>
                                        <Marker position={{
                                            lat: restaurant.coordonate.latitudine,
                                            lng: restaurant.coordonate.longitudine
                                        }}/>
                                    </Map>
                                </APIProvider>
                                <p><strong>{restaurant.adresa}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.section} ${activeSection === 'menu' ? styles.active : ''}`} id="menu">
                    <h1>Meniu</h1>
                </div>
                <div className={`${styles.section} ${activeSection === 'reviews' ? styles.active : ''}`} id="reviews">
                    <h1>Review</h1>
                </div>
                <div className={`${styles.section} ${activeSection === 'reserve' ? styles.active : ''}`} id="reserve">
                    <h1>Reserve</h1>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} images={restaurant.imagini} />
        </div>
    );
};

export default RestaurantPage;
