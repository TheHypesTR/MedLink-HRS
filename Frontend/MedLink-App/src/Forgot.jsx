import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.mjs";
import "./LoginRegister.css";

function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Kullanıcı Şifresini Unuttuğunda E-Mail Adresini Girerek Şifre Sıfırlama Bağlantısını Aldığı APİ.
    const sifremiUnuttum = async (e) => {
        try {
            e.preventDefault();
            if(email) {
                await fetch(`http://localhost:${config.PORT}/auth/reset-password`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.ERROR) 
                        alert(data.ERROR);
                    if(data.STATUS) {
                        alert(data.STATUS);
                        navigate("/");
                    }
                })
            }
            else
                throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
            
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="katman1-forgot">
        <div className='formbox-forgot'>
            <form onSubmit={sifremiUnuttum}>
            <h1>Şifre Sıfırlama</h1>
            <div className='input-box'>
                <input type='email' placeholder='E-Mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
                <button type='submit'>Mail Gönder</button>
                <div className='kayit-ol'>
                        <p>Zaten hesabınız var mı?
                            <a href="Login"> Giriş Yapın</a>
                        </p>
                    </div>
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

export default Forgot;