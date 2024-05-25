import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultCard from "./assets/default-card.jpg";
import config from "../config.mjs";
import './Doctors.css';

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    // Database'den Poliklinikleri Çeken APİ.
    useEffect(() => {
        try {
            fetch(`http://localhost:${config.PORT}/doctor`, {
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
                    setDoctors([]);
                }
                if(data)
                    setDoctors(data);
            })
        
        } catch (err) {
            console.log(err);
        }

  }, []);

    return(
        <div className="card">
            {doctors.map((doctor, index) => (
                <div className="card" key={index}>
                    <img className="card-image" src={DefaultCard} alt="profile picture" width={200} height={200}/>
                    <h2 className="card-title">{`${doctor.speciality} ${doctor.name}`}</h2>
                    <p className="card-text">{doctor.polyclinic}</p>
                </div>
            ))}
        </div>
    );
}

export default Doctors;