/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import config from "../config.mjs";
import { useNavigate } from "react-router-dom";

function Logout () {
    const navigate = useNavigate();

    useEffect(() => {
        LogoutUser();
    }, []);

    const LogoutUser = async () => {
        try {
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
                    sessionStorage.setItem('user', "undefined");
                    sessionStorage.setItem('role', "undefined");
                    navigate("/");
                }
            })
            
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <p>Çıkış Yapıldı!</p>
    )
}

export default Logout;