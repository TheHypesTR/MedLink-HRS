import React from 'react';
import Navbar from './Navbar';
import Logo from './Logo';

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <Navbar />
        </header>
    );
};

export default Header;
