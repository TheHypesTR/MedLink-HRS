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
                alert("'Şartlar ve Koşulları Kabul Ediyorum' Kısmını İşaretleyiniz!!");
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
                    <div><img src='./src/assets/username.png' alt='name surname' className='icon3'  /><input type="text" placeholder="İsim - Soyisim" className='input-box2' value={name} onChange={(e) => setName(e.target.value)} /></div>
                    <div><img src='./src/assets/username.png' alt='TCno' className='icon3' /><input type="text" placeholder="T.C Kimlik No" className='input-box2' maxLength={11} value={TCno} onChange={(e) => setTCno(e.target.value)} /></div>
                    <div><img src="./src/assets/email.png" alt="email" className='icon3' /><input type="email" placeholder="E-Mail" className='input-box2' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div><img src='./src/assets/password.png' alt='password' className='icon3' /><input type="password" placeholder="Şifre" className='input-box2' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className='sifre-unut'><input type="checkbox" value={checkboxState} onChange={(e) => setCheckboxState(e.target.checked)} /><a href="#" className='sifrelink' >Şartları ve Koşulları Kabul Ediyorum</a></div>
                    <button className='girisbutonu'>Kayıt Ol</button>
                    <div className='kayitbutondivi'><p className='p2'>Hesabınız Varsa</p><a href="/Login" className='kayitbuton'> Giriş Yapın</a></div>
                
                </form>
            </div>
    );
}

export default Register;