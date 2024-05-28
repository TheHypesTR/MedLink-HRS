import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.mjs";
import "./CheckAppointment.css"

function CheckAppointment() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

  // Sayfa Açıldığında Kullanıcnın Randevularını Listeleyen API.
  useEffect(() => {
    showAppointments();
  }, []);

  // DB'den Kullanıcnın Randevularını Listeleyen API.
  const showAppointments = () => {
    fetch(`http://localhost:${config.PORT}/user/appointments`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.ERROR) {
            alert(data.ERROR);
            navigate("/Appointment");
            return;
        } 
        if(data) {
            setAppointments(data);
        }
      })
      .catch((err) => console.log(err));
  };

  // Kullanıcının Aktif Randevularını Silme API'si.
  const DeleteAppointment = async (appointment) => {
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    console.log(formattedDate);
    try {
        await fetch(`http://localhost:${config.PORT}/doctor/${appointment.doctorID}/appointment/${formattedDate}/deleteAppointment`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                timeSlot: appointment.timeSlot,
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.ERROR) {
              alert(data.ERROR);
              console.log(appointment)
            }
            if(data.STATUS){
              showAppointments();
            }
        })
    }
        
    catch (err) {
        console.log(err);
    }
  };

  // Tarih Formatını Düzenleyen Fonksiyon.
  const RemoveTime = (str) => {
    if (!str)
      return '';
    return str.split('T')[0];
  };

  return (
    <div className="randevucheckdiv">
        {appointments.map((appointment, index) => (
            <div className="randevukutucukdiv" key={index}>
                <p className="ornekyazi2">Poliklinik: {appointment.polyclinic}</p>
                <p className="ornekyazi2">Doktor: {appointment.doctor}</p>
                <p className="ornekyazi2">Randevu Tarihi: {RemoveTime(appointment.date)}</p>
                <p className="ornekyazi2">Randevu Saati: {appointment.time}</p>
                <button className="randevudeletebutton" onClick={() => DeleteAppointment(appointment)}>Randevuyu Sil</button>
                <hr />
            </div>
        ))}
    </div>
    );
}

export default CheckAppointment;