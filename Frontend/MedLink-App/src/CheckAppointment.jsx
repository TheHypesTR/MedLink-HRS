/* eslint-disable react-hooks/exhaustive-deps */
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
            if(sessionStorage.getItem('user') === "undefined")
              navigate("/Login")
            else
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

  // Yaklaşan Randevulardan Daha İleri Tarihli Olanlara Göre Sıralama Yapar.
  const sortedAppointments = appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="randevucheckdiv">
        {sortedAppointments.map((appointment, index) => (
            <div className="randevukutucukdiv" key={index}>
                <p className="ornekyazi2">Randevu - {index + 1}</p>
                <hr />
                <p className="ornekyazi2">{appointment.polyclinic}</p>
                <p className="ornekyazi2">{appointment.doctor}</p>
                <hr />
                <p className="ornekyazi2">Tarih: {RemoveTime(appointment.date)}</p>
                <hr />
                <p className="ornekyazi2">Saat: {appointment.time}</p>
                <hr />
                <button className="randevudeletebutton" onClick={() => DeleteAppointment(appointment)}>Randevuyu İptal Et</button>
            </div>
        ))}
    </div>
    );
}

export default CheckAppointment;