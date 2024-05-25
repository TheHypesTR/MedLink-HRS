import React, { useState, useEffect } from "react";
import config from "../config.mjs";
import './Polyclinics.css';

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
        <div className="polyclinics">
            {polyclinics.map((polyclinic, index) => (
                <div className="card" key={index}>
                    <h2 >{polyclinic.name}</h2>
                    <p >{polyclinic.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Polyclinics;