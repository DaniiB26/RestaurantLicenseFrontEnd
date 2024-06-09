import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useCity } from "../context/CityContext";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    FormControl,
    Badge,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styles from "./Header.module.css";
import useGeoLocation from "../hooks/useGeoLocation";
import { getNotifications, markNotificationsAsRead } from "../requests/notificationService";

export default function Header() {
    const { user, logout, restaurant } = useContext(AuthContext);
    const { city, setCity } = useCity();
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const location = useGeoLocation();

    useEffect(() => {
        if (location.city) {
            setCity(location.city);
        }
    }, [location.city, setCity]);

    useEffect(() => {
        if (user && user.id) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const notifications = await getNotifications(user.id);
            notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort notifications by createdAt in descending order
            setNotifications(notifications);
            setUnreadCount(notifications.filter(n => !n.read).length);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        navigate('/home'); // Actualizează pagina Home pentru noul oraș
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationMenuOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationMenuClose = async () => {
        setNotificationAnchorEl(null);
        try {
            await markNotificationsAsRead(user.id);
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        logout();
        handleMenuClose();
    };

    const handleLogoClick = () => {
        navigate('/home');
    };

    const handleManageRestaurantClick = () => {
        navigate(`/manage-restaurant/${restaurant.id}`);
        handleMenuClose();
    };

    return (
        <Box className={styles.header}>
            <AppBar position="static" className={styles.appBar}>
                <Toolbar>
                    <img
                        src="/Logo2.png"
                        alt="Login Info"
                        className={styles.img}
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h6" component="div" className={styles.customTypography}>
                        A Step Closer To Eat Your Favourite Food!
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl variant="outlined" className={styles.customFormControl}>
                            <div className={styles.customSelectWrapper}>
                                <select
                                    value={city}
                                    onChange={handleCityChange}
                                    className={styles.customSelect}
                                    name="city"
                                    id="select-city"
                                >
                                    <option aria-label="None" value="">Orasul tau</option>
                                    <option value="Bucharest">Bucuresti</option>
                                    <option value="Cluj-Napoca">Cluj-Napoca</option>
                                    <option value="Timisoara">Timisoara</option>
                                    <option value="Iasi">Iasi</option>
                                    <option value="Constanta">Constanta</option>
                                    <option value="Brasov">Brasov</option>
                                </select>
                            </div>
                        </FormControl>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="notifications"
                            aria-controls="notification-menu"
                            aria-haspopup="true"
                            onClick={handleNotificationMenuOpen}
                            color="inherit"
                            sx={{ fontSize: 40, paddingLeft: 2 }}
                        >
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="menu"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ fontSize: 40, paddingLeft: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: {
                                    backgroundColor: '#f8f9fa',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                },
                            }}
                        >
                            <MenuItem onClick={handleProfileClick}>
                                <AccountBoxIcon style={{ marginRight: '10px' }} /> View Profile
                            </MenuItem>
                            {user?.manager && (
                                <MenuItem onClick={handleManageRestaurantClick}>
                                    <RestaurantIcon style={{ marginRight: '10px' }} /> Manage Restaurant
                                </MenuItem>
                            )}
                            <MenuItem onClick={handleLogoutClick}>
                                <LogoutIcon style={{ marginRight: '10px' }} /> Logout
                            </MenuItem>
                        </Menu>
                        <Menu
                            anchorEl={notificationAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationMenuClose}
                            PaperProps={{
                                style: {
                                    backgroundColor: '#f8f9fa',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    width: '300px',
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                },
                            }}
                        >
                            <Box className={styles.notificationHeader}>
                                <Typography variant="h6" component="div">
                                    Notifications
                                </Typography>
                            </Box>
                            <Divider />
                            {notifications.length === 0 ? (
                                <MenuItem>No notifications</MenuItem>
                            ) : (
                                <List>
                                    {notifications.map((notification) => (
                                        <ListItem key={notification.id} button>
                                            <ListItemText primary={notification.message} secondary={new Date(notification.createdAt).toLocaleString()} />
                                            {!notification.read && <Box className={styles.unreadDot}></Box>}
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
