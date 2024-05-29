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
            });
        
        } catch (err) {
            console.log(err);
        }

  }, []);

  // Doktorları Poliklinik İsimlerine Göre Sıralama Yapar.
  const sortedDoctors = doctors.sort((a, b) => a.polyclinic.localeCompare(b.polyclinic));

    return(
        <div className="doctors-container">
            {sortedDoctors.map((doctor, index) => (
                <div className="doctors-card" key={index}>
                    <img className="doctor-card-background" src={doctor.image} alt="profile picture" />
                    <div className="doctor-name-background-parent">
                        <div className="doctor-name-background" />
                            <div className="doctors-name-wrapper">
                                <div className="doctors-name">{`${doctor.speciality} ${doctor.name}`}</div>
                            </div>
                            <div className="polyclinic-parent">
                                <b className="polyclinic">{doctor.polyclinic}</b>
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