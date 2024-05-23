import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config.mjs';
import './LoginRegister.css';

function Login() {
    const navigate = useNavigate();
    const [TCno, setTCno] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kullanıcı Bilgilerinin Denetleyip Giriş Yapıp Yapmadığını Kontrol Ediyor.
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if(loggedInStatus === "true"){
            setIsLoggedIn(true);
            navigate("/");
        }
    }, [navigate]);

    const girisYap = async (e) => {
        const formData = {
            TCno: TCno,
            password: password,
        };

        try {
            e.preventDefault();
            let errorMessage = "";
            if(TCno && password){
                await fetch(`http://localhost:${config.PORT}/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.ERROR){
                        if (Array.isArray(data.ERROR)) errorMessage = data.ERROR.map(err => err.msg).join("\n");
                        errorMessage = data.ERROR;
                        alert(errorMessage);
                    }
                    if(data.STATUS) {
                        alert(data.STATUS);
                        localStorage.setItem("isLoggedIn", "true");
                        navigate("/");
                    }
                })
            }

            else 
                alert("Lütfen Gerekli Alanları Doldurunuz!!");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="katman1">
            <div className='formbox-login'>
                <form onSubmit={girisYap}>
                <h1>Giriş Yap</h1>
                <div className='input-box'>
                    <input type='text' placeholder='TC Kimlik No' required value={TCno} onChange={(e) => setTCno(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Şifre' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='sifreunut-benihatirla'>
                        <label htmlFor=""><input type="checkbox" />Beni Hatırla</label>
                        <a href='Forgot'> Şifremi Unuttum</a>
                    </div>

                    <button type='submit'>Giriş Yap</button>

                    <div className='kayit-ol'>
                        <p>Hesabınız yok mu?
                            <a href="Register"> Kayıt Olun</a>
                        </p>
                    </div>
                    </form>
            </div>
        </div>
    );
}

export default Login;