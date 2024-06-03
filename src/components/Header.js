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
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styles from "./Header.module.css";
import useGeoLocation from "../hooks/useGeoLocation";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
    const { username } = useContext(AuthContext);
    const { city, setCity } = useCity();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useGeoLocation();

    useEffect(() => {
        if (location.city) {
            setCity(location.city);
        }
    }, [location.city, setCity]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
        navigate('/home'); // Actualizează pagina Home pentru noul oraș
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        // Implement logout logic here
        handleMenuClose();
    };

    const handleLogoClick = () => {
        navigate('/home');
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
                        style={{cursor: 'pointer'}} // Adăugăm stil pentru cursor pointer
                    />
                    <Box sx={{flexGrow: 1}}/>
                    <Typography variant="h6" component="div" className={styles.customTypography}>
                        A Step Closer To Eat Your Favourite Food!
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
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
                            aria-label="menu"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{fontSize: 40, paddingLeft: 2}} // Adăugăm stilizarea aici
                        >
                            <MenuIcon/>
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
                                <AccountBoxIcon style={{marginRight: '10px'}}/> View Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogoutClick}>
                                <LogoutIcon style={{marginRight: '10px'}}/> Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
