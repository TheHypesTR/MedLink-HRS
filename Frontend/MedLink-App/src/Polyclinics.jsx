import React, { useState, useEffect } from "react";
import config from "../config.mjs";
import './Polyclinics.css';
import DefaultCard from "./assets/default-card.jpg";

function Polyclinics() {
    const [polyclinics, setPolyclinics] = useState([]);
    
    // Database'den Poliklinikleri Çeken APİ.
    useEffect(() => {
        try {
            fetch(`http://localhost:${config.PORT}/polyclinic`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.ERROR) {
                    alert(data.ERROR);
                    setPolyclinics([]);
                }
                if(data)
                    setPolyclinics(data);
            })
        
        } catch (err) {
            console.log(err);
        }

  }, []);

    return (
<div className="poly-container">
                <div className="poly-card">
                    <img className="poly-card-background" src={DefaultCard} alt="profile picture" />
                    <div className="poly-name-background-parent">
                        <div className="poly-name-background" />
                            <div className="poly-name-wrapper">
                                <div className="poly-name">AaaaAa</div>
                            </div>
                            <div className="polyclinic-parent">
                                <b className="polyclinic">AaaAaaa</b>
                                <div className="frame-wrapper1">
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Polyclinics;