import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
    
    return (
        <div className="navbar">
            <Link to="/">Ana Sayfa</Link>
            <Link to="/Polyclinics">Tıbbi Birimler</Link>
            <Link to="/Doctors">Doktorlar</Link>
            <Link to="/Blog">Blog</Link>
            <Link to="/Contact">İletişim</Link>
            <Link to ="/AboutUs">Hakkımızda</Link>
            <Dropdown title="E-Randevu" items={[ {link: "/Appointment", label: "Randevu Al" },
                                                 {link: "/", label: "Randevu Sorgula"}]} id="sola-al" />
            <Dropdown 
                title="Üye Girişi" 
                items={[
                    { link: "/Login", label: "Giriş Yap" },
                    { link: "/Register", label: "Kayıt Ol" }
                ]}
            />
        </div>
    );
};

export default Navbar;
