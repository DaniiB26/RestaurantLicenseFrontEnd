import React from 'react';
import styles from './ProfileDetails.module.css';

const ProfileDetails = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profileDetails}>
            <h2>Profile Details</h2>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>Average Grade:</strong> {user.avgGrade !== -1 ? user.avgGrade.toFixed(2) : 'Not yet rated'}</p>
        </div>
    );
};

export default ProfileDetails;
