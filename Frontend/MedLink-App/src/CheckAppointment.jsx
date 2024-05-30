/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.mjs";
import "./CheckAppointment.css"

function CheckAppointment() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);

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

  // Doktor Derecelendirme API'si.
  const RateDoctor = async (appointment, rating) => {
    try {
      console.log(appointment);
      await fetch(`http://localhost:${config.PORT}/doctor/${appointment.doctorID}/appointment/${appointment._id}/rate`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ERROR) {
            alert(data.ERROR);
          }
          if (data.STATUS) {
            alert(data.STATUS);
          }
        });

    } catch (err) {
      console.log(err);
    }
  };

  // Doktor Derecelendirme Fonksiyonu.
  const RateDoctorNow = async () => {
    if (!selectedRating) {
        alert("Lütfen bir değer seçin.");
        return;
    }
    RateDoctor(selectedAppointment, selectedRating);
    setSelectedAppointment("");
    setSelectedRating(0);
    showAppointments();
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
                <button className="randevudeletebutton" onClick={() => DeleteAppointment(appointment)}>İptal Et</button>
                <button className={`rating-button ${appointment.rated ? 'deactivated' : ''}`} onClick={() => setSelectedAppointment(appointment)}>Değerlendir</button>
            </div>
        ))}
        {selectedAppointment && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Değerlendirme</h2>
                        <p>{selectedAppointment.polyclinic}</p>
                        <p>{selectedAppointment.doctor}</p>
                        <p>{RemoveTime(selectedAppointment.date)}</p>
                        <p>{selectedAppointment.time}</p>
                        <div>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button key={value} onClick={() => setSelectedRating(value)}>{value}</button>
                          ))}
                        </div>
                        <button onClick={RateDoctorNow}>Değerlendir</button>
                    </div>
                </div>
            )}
    </div>
    );
}

export default CheckAppointment;