import React, { useState, useEffect } from 'react';
import PolyCard from './PolyCard';
import config from '../config.mjs';
import './PolyCards.css';

function PolyCards() {
  const [polyclinics, setPolyclinics] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Sayfa Açıldığında Poliklinikleri Listeleyen API.
  useEffect(() => {
    showPolyclinics();
  }, []);

  // DB'den Poliklinkleri Listeleyen API.
  const showPolyclinics = () => {
    fetch(`http://localhost:${config.PORT}/polyclinic`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
          setPolyclinics([]);
        } 
        if(data) {
          setPolyclinics(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectPolyclinic = (polyclinic) => {
    setSelectedPolyclinic(polyclinic);
    setPolyclinics([]);
    showDoctors(polyclinic._id);
  };

  // Seçilen Poliklinikteki Doktorları Görüntüleyen API.
  const showDoctors = (id) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${id}/doctor`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.ERROR) {
          alert(data.ERROR);
          showPolyclinics();
        } 
        if (data) {
          setDoctors(data);
          setSelectedPolyclinic(id);
          setPolyclinics([]);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid">
        {polyclinics.map((polyclinic, index) => (
          <PolyCard 
            key={index}
            name={polyclinic.name} 
            description={polyclinic.description} 
            imgSrc={polyclinic.imgSrc || './src/assets/default-card.jpg'}
            onClick={() => selectPolyclinic(polyclinic)}
          />
        ))}
      </div>
      {selectedPolyclinic && (
        <div className="doctors-list">
          <h2>{selectedPolyclinic.name} Doktorları</h2>
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index}>{doctor.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PolyCards;