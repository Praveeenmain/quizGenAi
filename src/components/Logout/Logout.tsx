// src/components/LogoutButton.tsx
import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './index.css';

const LogoutButton: React.FC = () => {
    const auth = getAuth();
    const navigate = useNavigate(); // Correct usage of useNavigate

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out.");
            navigate('/login'); // Corrected redirection
        }).catch((error: any) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
