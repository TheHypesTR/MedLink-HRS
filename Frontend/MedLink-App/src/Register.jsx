import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../config.mjs";
import './LoginRegister.css';

function Register() {
    const navigate = useNavigate(); 
    const [name, setName] = useState("");
    const [TCno, setTCno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkboxState, setCheckboxState] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kullanıcı Bilgilerinin Denetleyip Giriş Yapıp Yapmadığını Kontrol Ediyor.
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if(loggedInStatus === "true") {
            setIsLoggedIn(true);
            navigate("/");
        }
    }, [navigate]);

    // Kullanıcı'nın Bilgilerini DB'ye Kaydetmek İçin BE'den Çağırılan APİ.
    const kayitOl = async (e) => {
        const formData = {
            name: name,
            TCno: TCno,
            email: email,
            password: password,
        };
        
        try {
            e.preventDefault();
            let errorMessage = "";
            if(checkboxState === false) {
                alert("'Şartlar ve koşulları kabul ediyorum' Kısmını İşaretleyiniz!!");
                return;
            }
                
            if(name && TCno && email && password) {
                await fetch(`http://localhost:${config.PORT}/auth/register`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.ERROR) {
                        Array.isArray(data.ERROR) ? errorMessage = data.ERROR.map(err => err.msg).join("\n") : errorMessage = data.ERROR;
                        alert(errorMessage);
                    }
                    if(data.STATUS) {
                        alert(data.STATUS);
                        navigate("/login");
                    }
                })
            }
            else
                throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
            
        } catch (err) {
            console.log(err);
        }
    };
    
    return (

            <div className='formbox-register'>
                <form onSubmit={kayitOl}>
                <h1 className='yazi1'>Kayıt Ol</h1>
                    <div><span className='icon2'><img src='./src/assets/username.png' alt='username'  /></span><input type="text" placeholder="İsim - Soyisim" className='input-box2'/></div>
                    <div><span className='icon2'><img src="./src/assets/password.jpg" alt="password" /></span><input type="email" placeholder="E-Mail" className='input-box2' /></div>
                    <div><span className='icon2'><img src='./src/assets/username.png' alt='username'  /></span><input type="text" placeholder="T.C Kimlik No" className='input-box2'/></div>
                    <div><span className='icon2'><img src='./src/assets/username.png' alt='username'  /></span><input type="password" placeholder="Şifre" className='input-box2'/></div>
                    <div className='sifre-unut'><input type="checkbox" /><a href="#" className='sifrelink'>Şartları ve koşulları kabul ediyorum</a></div>
                    <button className='girisbutonu'>Kayıt Ol</button>
                    <div className='kayitbutondivi'><p className='p2'>Hesabınız varsa</p><a href="#" className='kayitbuton'> giriş yapın</a></div>
                
                </form>
            </div>
    );
}

export default Register;