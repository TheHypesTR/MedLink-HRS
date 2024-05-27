import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
    const navigate = useNavigate();

    // MedLink Logosuna Tıklayınca "Ana Sayfa" Ekranına Yönlendirir.
    const ClickLogo = () => {
        navigate("/");
    };

    return (
        <a href="#" className="logo"><img src="./src/assets/logo.png" alt="logo" onClick={ClickLogo} /></a>
    );
};

export default Logo;
