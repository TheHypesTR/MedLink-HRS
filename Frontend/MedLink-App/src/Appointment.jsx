/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import config from "../config.mjs";
import './Appointment.css';

// Seçili Poliklinikteki Doktora Randevu Tarihi Ekleyen Sayfa.
function Appointment() {
    const [polyclinics, setPolyclinics] = useState([]);
    const [polyclinicID, setPolyclinicID] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [doctorID, setDoctorID] = useState("");
    const [date, setDate] = useState("");

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

    // Seçili Polikliniklerdeki Doktorları Getiren APİ.
    const fetchDoctors = async () => {
        if (!polyclinicID) return;
        try {
            await fetch(`http://localhost:${config.PORT}/polyclinic/${polyclinicID}/doctor`, {
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
                    return;
                }
                if(data)
                    setDoctors(data);
            })

        } catch (err) {
            console.log(err);
        }
    }

    // Poliklinik Seçildiğinde Doktorlarını Getiren API'yi Çalıştırır.
    useEffect(() => {
        fetchDoctors();
    }, [polyclinicID]);

    // Randevu Oluşturma API'si.
    const randevuOlustur = async (e) => {
        try {
            e.preventDefault();      
            if(polyclinicID, doctorID, date) {
                await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${polyclinicID}/doctor/${doctorID}/appointment/add`, {
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
        <form className="katman1-randevu" onSubmit={randevuOlustur}>
            <p className="isim1">Poliklinik Seçiniz</p>
            <select className="polikliniksec" required onChange={(e) => setPolyclinicID(e.target.value)}>
                <option value="">Poliklinik Seçiniz</option>
                {polyclinics.map(polyclinic => (
                    <option key={polyclinic._id} value={polyclinic._id}>{polyclinic.name}</option>
                ))}
            </select>
    
            <p className="isim1">Doktor Seçiniz</p>
            <select className="polikliniksec" required onChange={(e) => setDoctorID(e.target.value)} value={doctorID}>
                <option value="">Doktor Seçiniz</option>
                {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                ))}
            </select>
    
            <p className="isim1" >Randevu Tarihi</p>
            <input type="date" id="randevutarihi" required value={date} onChange={(e) => setDate(e.target.value)} />

            <p className="isim1">Randevu Saati</p>
            <input type="time" id="randevusaati" />

            <button className="randevual" type="submit" >Randevu Al</button>
        </form>
    );
}

export default Appointment;