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
        <div className="katman1-register">
            <div className='formbox-register'>
                <form onSubmit={kayitOl}>
                <h1>Kayıt Ol</h1>
                <div className='input-box'>
                    <input type='text' placeholder='İsim - Soyisim' required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='TC Kimlik No' required maxLength={11} value={TCno} onChange={(e) => setTCno(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='E-Mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Şifre' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='sifreunut-benihatirla'>
                        <label htmlFor=""><input type="checkbox" value={checkboxState} onChange={(e) => setCheckboxState(e.target.checked)} />Şartlar ve koşulları kabul ediyorum</label>
                    </div>

                    <button type='submit'>Kayıt Ol</button>

                    <div className='kayit-ol'>
                        <p>Zaten kayıtlı mısınız?
                            <a href="Login"> Giriş Yapın</a>
                        </p>
                    </div>
                    </form>
            </div>
        </div>
    );
}

export default Register;