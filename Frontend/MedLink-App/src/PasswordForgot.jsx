import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config.mjs";
import './LoginRegister.css';

function PasswordForgot() {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get("userid");
    const token = queryParams.get("token");

    const sifreSifirla = async (e) => {
        try {
            e.preventDefault();
            let errorMessage = "";
            if(password) {
                await fetch(`http://localhost:${config.PORT}/auth/user/reset-password/${userid}/${token}`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password: password,
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.ERROR) {
                        Array.isArray(data.ERROR) ? errorMessage = data.ERROR.map(err => err.msg).join("\n") : errorMessage = data.ERROR;
                        alert(errorMessage);
                    }
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
                <form onSubmit={sifreSifirla}>
                    <h1>Şifre Sıfırlama</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Yeni Şifreyi Giriniz' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit'>Sıfırla</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordForgot;