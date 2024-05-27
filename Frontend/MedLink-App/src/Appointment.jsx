import React, { useState, useEffect } from 'react';
import PolyCard from './PolyCard.jsx';
import DocCard from './DocCard.jsx';
import config from '../config.mjs';
import './Appointment.css';

function PolyCards() {
  const [polyclinics, setPolyclinics] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [date, setDate] = useState("");

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

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctors([]);
    showAppointments(doctor);
  };
  
  const resetSelectionDoctor = () => {
    setSelectedPolyclinic("");
    setDoctors([]);
    showPolyclinics();
  };

  const randevuGoruntule = async (e) => {
    try {
        e.preventDefault();      
        if(selectedDoctor, date) {
            await fetch(`http://localhost:${config.PORT}/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/appointment/${date}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
                if(data.ERROR) {
                  randevuOlustur()
                }
                if(data.STATUS) {
                  setAppointments(data);
                }
            })
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");

    } catch (err) {
        console.log(err);
    }
};

  // Randevu Oluşturma API'si.
  const randevuOlustur = async () => {
    try {
        if(selectedDoctor, date) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/appointment/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) 
                    alert(data.ERROR);
                if(data.STATUS)
                    alert(data.STATUS);
            })
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");

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
      {selectedPolyclinic && !selectedDoctor && (
        <div className="doctors-list">
          <button onClick={resetSelectionDoctor}>Poliklinik Seçimine Dön</button>
          <ul>
            {doctors.map((doctor, index) => (
              <DocCard
              key={index}
              name={doctor.speciality + " " + doctor.name} 
              polyclinicName={doctor.polyclinic} 
              imgSrc={doctor.imgSrc || './src/assets/default-card.jpg'}
              onClick={() => selectDoctor(doctor)}
            />
            ))}
          </ul>
        </div>
      )}{selectedDoctor && (
        <div className="appointment-form">
          <h2>{selectedDoctor.polyclinic} - {selectedDoctor.speciality + " " + selectedDoctor.name} ile Randevu Oluştur</h2>
          <form onSubmit={randevuGoruntule}>
            <div>
              <label>Randevu Tarihi:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <button type="submit">Randevu Bul</button>
          </form>
          <button onClick={resetSelectionDoctor}>Geri Dön</button>
        </div>
      )}
    </div>
  );
}

export default PolyCards;