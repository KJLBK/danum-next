'use client';

import { checkAuth } from '../../service/authService';

export default function CheckAuthButton({ RefreshToken }) {
    const handleAuthCheck = () => {
        if (RefreshToken) {
            checkAuth(RefreshToken);
        } else {
            console.log('No Refresh Token found');
        }
    };

    return (
        <button onClick={handleAuthCheck}>
            Check Auth
        </button>
    );
}
