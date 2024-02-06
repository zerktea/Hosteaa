import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export default function Logout({ onLogout }) {
    const navigate = useNavigate();
    const goLogout = () => {
        localStorage.removeItem('token');
        navigate(`/Login`);
    }
    return (
        <div>
            <button onClick={goLogout}>Logout</button>
        </div>
    )
}