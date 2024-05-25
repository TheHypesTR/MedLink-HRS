import React from "react";
import './Doctors.css';
import DefaultCard from "./assets/default-card.jpg";

function Doctors() {
    return(
        <div className="card">
            <img className="card-image" src={DefaultCard} alt="profile picture" width={200} height={200}/>
            <h2 className="card-title">Doktor Adı</h2>
            <p className="card-text">Doktor Bölümü</p>
        </div>
    );
};

export default Doctors;