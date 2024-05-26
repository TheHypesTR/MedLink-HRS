import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
    
    return (
        <div className="navbar">
            <Link to="/">Ana Sayfa</Link>
            <Dropdown title="Kurumsal" items={["Hakkımızda", "Organizasyon", "Misyon-Vizyon", "Hasta Hakları"]} />
            <Link to="/Departments">Bölümler</Link>
            <Link to="/Doctors">Doktorlar</Link>
            <Link to="/Blog">Blog</Link>
            <Dropdown title="İletişim" items={["+90 561 610 61 61", "@hastane.com", "@hastane.gmail.com"]} />
            <Dropdown title="E-Randevu" items={[ {link: "/Appointment", label: "Randevu Al" }]} id="sola-al" />
            <Dropdown 
                title="Üye Girişi" 
                items={[
                    { link: "/Login", label: "Giriş Yap" },
                    { link: "/Register", label: "Kayıt Ol" }
                ]}
            />
            <Link to="/Appointment">Randevu Al</Link>
            <Link to="/Polyclinics">Poliklinikler</Link>
            <Link to="/AdminPanel">Admin Panel</Link>
        </div>
    );
};

export default Navbar;
