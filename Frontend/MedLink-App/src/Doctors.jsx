import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultCard from "./assets/default-card.jpg";
import config from "../config.mjs";
import './Doctors.css';

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    // Database'den Doktorları Çeken APİ.
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
                <div className="doctors-card" key={index}>
                    <img className="doctor-card-background" src={DefaultCard} alt="profile picture" />
                    <h2 className="card-title">{`${doctor.speciality} ${doctor.name}`}</h2>
                    <p className="card-text">{doctor.polyclinic}</p>
                    <div className="doctor-name-background-parent">
        <div className="doctor-name-background" />
        <div className="doctors-name-wrapper">
          <div className="doctors-name32">Doctor’s Name</div>
        </div>
        <div className="neurology-parent">
          <b className="neurology32">Neurology</b>
          <div className="frame-wrapper1">
          </div>
        </div>
        </div>
        </div>
            ))}
        </div>
    );
}

export default Doctors;