import React, { useState, useEffect } from "react";
import config from "../config.mjs";
import './Polyclinics.css';
import './Doctors.css';
import DefaultCard from "./assets/logo.png";

function Polyclinics() {
    const [polyclinics, setPolyclinics] = useState([]);
    const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
    const [doctors, setDoctors] = useState([]);
    
    // Sayfa Açıldığında Poliklinikleri Çeken API.
    useEffect(() => {
        ShowPolyclinics();
    }, []);

    // Database'den Poliklinikleri Çeken APİ.
    const ShowPolyclinics = () => {
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

  };

  // Database'den Seçili Poliklinikteki Doktorları Çeken APİ.
    const ShowDoctors = (polyclinic) => {
        try {
            fetch(`http://localhost:${config.PORT}/polyclinic/${polyclinic._id}/doctor`, {
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
    };

    // Seçilen Poliklinikteki Doktorları Gösterir.
    const selectPolyclinic = (polyclinic) => {
        setSelectedPolyclinic(polyclinic);
        setPolyclinics([]);
        ShowDoctors(polyclinic);
      };

      // Polikliniklere Geri Döner.
      const returnPolyclinics = () => {
        setSelectedPolyclinic("");
        setDoctors([]);
        ShowPolyclinics();
      };

  // Poliklinikleri Alfabetik Sıraya Göre Sıralama Yapar.
  const sortedPolyclinics = polyclinics.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
        <div className="poly-container">
            {sortedPolyclinics.map((polyclinic, index) => (
                <div className="poly-card" key={index} onClick={() => selectPolyclinic(polyclinic)}>
                    <img className="poly-card-background" src={DefaultCard} alt="profile picture" />
                    <div className="poly-name-background-parent">
                        <div className="poly-name-background" />
                        <div className="poly-name-wrapper">
                            <div className="poly-name">{polyclinic.name}</div>
                        </div>
                        <div className="polyclinic-parent">
                            <b className="polyclinic">{polyclinic.description}</b>
                            <div className="frame-wrapper1"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {selectedPolyclinic && (
            <div>
            <button id='poliklinikDonus' onClick={returnPolyclinics}>Poliklinikleri Göster</button>
                <div className="doctors-container">
                {doctors.map((doctor, index) => (
                    <div className="doctors-card" key={index}>
                        <img className="doctor-card-background" src={doctor.image || DefaultCard} alt="profile picture" />
                        <div className="doctor-name-background-parent">
                            <div className="doctor-name-background" />
                            <div className="doctors-name-wrapper">
                                <div className="doctors-name">{`${doctor.speciality} ${doctor.name}`}</div>
                            </div>
                            <div className="polyclinic-parent">
                                <b className="polyclinic">{doctor.polyclinic}</b>
                                <div className="frame-wrapper1"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        )}
    </div>
);
}

export default Polyclinics;