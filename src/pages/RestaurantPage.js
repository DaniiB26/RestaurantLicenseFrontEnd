import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styles from './RestaurantPage.module.css';
import { getRestaurantByName } from "../requests/restaurantService";
import Header from "../components/Header";
import StarRatings from "react-star-ratings";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Gallery } from "react-grid-gallery";
import CardReview from '../components/CardReview';
import {addReview, findReviewsByRestaurant} from "../requests/reviewService";
import CreateReview from "../components/CreateReview";
import {AuthContext} from "../context/AuthProvider";
import CreateReservation from "../components/CreateReservation";
import {addReservation} from "../requests/reservationService";

const RestaurantPage = () => {
    const { name } = useParams();
    const { user } = useContext(AuthContext);
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchRestaurantAndReviews = async () => {
            try {
                const restaurantData = await getRestaurantByName(name);
                setRestaurant(restaurantData);
                const reviewsData = await findReviewsByRestaurant(restaurantData.id);
                setReviews(reviewsData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchRestaurantAndReviews();
    }, [name]);

    const handleOpenImageModal = (index) => {
        setCurrentImageIndex(index);
        setIsImageModalOpen(true);
    };

    const handleCloseImageModal = () => {
        setIsImageModalOpen(false);
    };

    const handleOpenReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleMenuClick = (section) => {
        setActiveSection(section);
    };

    const handleSubmitReview = async (review) => {
        try {
            const fullReview = {
                ...review,
                userId: user.id,
                userName: user.fullName,
                restaurantId: restaurant.id,
                data: new Date(),
                likes: 0,
                dislikes: 0,
                splitRating: review.splitRating ? review.splitRating : null
            };
            const newReview = await addReview(fullReview);
            setReviews([...reviews, newReview]);
            handleCloseReviewModal();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleSubmitReservation = async (reservation) => {
        try {
            reservation.user_id = user.id;
            reservation.restaurant_id = restaurant.id;
            await addReservation(reservation);
        } catch (error) {
            console.error(error);
        }
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

    const photos = restaurant.imagini.map((url) => ({
        original: url,
        originalHeight: '350px',
        thumbnail: url,
    }));
    const photos2 = restaurant.imagini.map((url) => ({
        src: url,
        height: '350px',
    }));

    const ImageModal = ({ isOpen, onClose, images, startIndex }) => {
        if (!isOpen) return null;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>x</button>
                    <ImageGallery
                        items={images}
                        startIndex={startIndex}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        infinite={true}
                    />
                </div>
            </div>
        );
    };

    const groupedMenuItems = restaurant.meniu.reduce((acc, item) => {
        if (!acc[item.tip]) {
            acc[item.tip] = [];
        }
        acc[item.tip].push(item);
        return acc;
    }, {});

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
                    <div className={styles.card2}>
                        <h2>Photos</h2>
                        <hr/>
                        <div className={styles.gallery}>
                            <Gallery images={photos2} enableImageSelection={false}
                                     onClick={(index) => handleOpenImageModal(index)}/>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className={`${styles.section} ${activeSection === 'menu' ? styles.active : ''}`} id="menu">
                    <h1>Meniu</h1>
                    {Object.keys(groupedMenuItems).map((type) => (
                        <div key={type}>
                            <h2 className={styles.type}>{type}</h2>
                            <div className={styles.menuGrid}>
                                {groupedMenuItems[type].map((item, index) => (
                                    <div key={index} className={styles.menuItem}>
                                        <div className={styles.menuItemDetails}>
                                            <h3>{item.preparat}</h3>
                                            <p>{item.descriere}</p>
                                            <p className={styles.price} >{item.pret}</p>
                                        </div>
                                        <img src={item.imagine} alt={item.preparat} className={styles.menuItemImage} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${styles.section} ${activeSection === 'reviews' ? styles.active : ''}`} id="reviews">
                    <h1>Review</h1>
                    <button className={styles.addReviewButton} onClick={handleOpenReviewModal}>Add Review</button>
                    <div className={styles.reviewsGrid}>
                        {reviews.map((review, index) => (
                            <CardReview key={index} review={review}/>
                        ))}
                    </div>
                </div>
                <div className={`${styles.section} ${activeSection === 'reserve' ? styles.active : ''}`} id="reserve">
                    <h1>Reserve</h1>
                    <CreateReservation onSubmit={handleSubmitReservation} restaurantId={restaurant.id} />
                </div>
            </div>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} images={photos}
                        startIndex={currentImageIndex}/>
            <CreateReview
                isOpen={isReviewModalOpen}
                onClose={handleCloseReviewModal}
                onSubmit={handleSubmitReview}
                menuItems={restaurant.meniu} // Trimite lista de meniuri către CreateReview
            />
        </div>
    );
};

export default RestaurantPage;
