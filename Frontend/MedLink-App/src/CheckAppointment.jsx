import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.mjs";

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
        if (data.ERROR) {
            alert("Aktif Randevunuz Bulunmamaktadır!!");
            navigate("/Appointment");
            return;
        } 
        if(data) {
            setAppointments(data);
        }
      })
      .catch((err) => console.log(err));
  };

  // Randevu Silme API'si.
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

  const RemoveTime = (str) => {
    if (!str)
      return '';
    return str.split('T')[0];
  };

  return (
    <div>
        {appointments.map((appointment, index) => (
            <div key={index}>
                <p>Poliklinik: {appointment.polyclinic}</p>
                <p>Doktor: {appointment.doctor}</p>
                <p>Randevu Tarihi: {RemoveTime(appointment.date)}</p>
                <p>Randevu Saati: {appointment.time}</p>
                <button onClick={() => DeleteAppointment(appointment)}>Randevuyu Sil</button>
                <hr />
            </div>
        ))}
    </div>
    );
}

export default CheckAppointment;