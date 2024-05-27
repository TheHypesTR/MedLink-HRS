import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import config from '../../config.mjs';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("undefined");
    const [isAdmin, setIsAdmin] = useState("undefined");

    useEffect(() => {
        const userName = sessionStorage.getItem('user');
        const userPerm = sessionStorage.getItem('role');
        if (userName !== "undefined" && userPerm !== "undefined")
            setUser(userName);
            setIsAdmin(userPerm);
    }, []);

    const LogoutUser = async (e) => {
        try {
            e.preventDefault();
            let errorMessage = "";
            await fetch(`http://localhost:${config.PORT}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) {
                    Array.isArray(data.ERROR) ? errorMessage = data.ERROR.map(err => err.msg).join("\n") : errorMessage = data.ERROR;
                    alert(errorMessage);
                }
                if(data.STATUS) {
                    alert(data.STATUS);
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('role');
                    setUser("undefined");
                    setIsAdmin("undefined");
                    navigate("/");
                }
            })
            
        } catch (err) {
            console.log(err);
        }
    };
    
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
            {user !== "undefined" ? (
                <>
                    <Dropdown 
                    title={user} 
                    items={[
                        { label: "Çıkış Yap", link: "/Logout" }
                    ]}
                />
                    {isAdmin === "Admin" && <Link to="/AdminPanel">Admin Paneli</Link>}
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
