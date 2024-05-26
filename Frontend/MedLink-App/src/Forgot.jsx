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
        <div className='formbox-forgot'>
            <form onSubmit={sifremiUnuttum}>
            <h1 className='yazi1'>Şifremi Sıfırla</h1>
                    <div><span className='icon2'><img src='./src/assets/username.png' alt='username' /></span><input type="email" placeholder="E-Mail" className='input-box2' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <button className='girisbutonu'>Şifremi Sıfırlama Bağlantısı Gönder</button>
                </form>
        </div>
    );
}

export default Forgot;