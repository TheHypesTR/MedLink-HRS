import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
    const [user, setUser] = useState("undefined");
    const [isAdmin, setIsAdmin] = useState("undefined");

    useEffect(() => {
        const userName = sessionStorage.getItem('user');
        const userPerm = sessionStorage.getItem('role');
        if (userName !== "undefined" && userPerm !== "undefined")
            setUser(userName);
            setIsAdmin(userPerm);
    }, []);

    return (
        <div className="navbar">
            <Link to="/">Ana Sayfa</Link>
            <Link to="/Polyclinics">Tıbbi Birimler</Link>
            <Link to="/Doctors">Doktorlar</Link>
            <Link to="/Blog" className="haber1">Haberler</Link>
            <Link to="/Contact" className='iletisim1'>İletişim</Link>
            <Link to ="/AboutUs">Hakkımızda</Link>
            <Dropdown title="E-Randevu" items={[ {link: "/Appointment", label: "Randevu Al"},
                                                 {link: "/", label: "Randevu Sorgula"}]}  />
            {user !== "undefined" ? (
                <>
                    <Dropdown 
                    title={user} 
                    items={[
                        { link: "/Logout", label: "Çıkış Yap" }
                    ]}
                />
                    {isAdmin === "Admin" && <Link to="/AdminPanel" className='adminpanelad'>Admin Paneli</Link>}
                </>
            ) : (
                <Dropdown 
                    title="Kullanıcı"
                    items={[
                        { link: "/Login", label: "Giriş Yap" },
                        { link: "/Register", label: "Kayıt Ol" }
                    ]}
                />
            )}
        </div>
    );
};

export default Navbar;
