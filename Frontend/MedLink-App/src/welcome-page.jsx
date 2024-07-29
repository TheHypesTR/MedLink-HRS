/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import config from "../config.mjs";
import "./welcome-page.css";
import DefaultCard from "./assets/logo.png";
import Faruk1Resim from './assets/Faruk1.jpg';
import Irem from './assets/Irem.jpg';

function WelcomePage() {
  const [polyclinics, setPolyclinics] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isShowDoctorsPopup, setIsShowDoctorsPopup] = useState(false);

  // Sayfa Açıldığında Kullanıcı Bilgilerini ve Poliklinikleri Çeken API.
  useEffect(() => {
    CheckUser();
    ShowPolyclinics();
  }, []);

  // Aktif Kullanıcı Bilgilerini Çeken API.
  const CheckUser = () => {
    fetch(`http://localhost:${config.PORT}/auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data) {
          sessionStorage.setItem("user", data.name);
          sessionStorage.setItem("role", data.role);
        }
      })
      .catch((err) => console.log(err));
  };

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
    ShowDoctors(polyclinic);
    setIsShowDoctorsPopup(true);
  };

// Poliklinikleri Alfabetik Sıraya Göre Sıralama Yapar.
const sortedPolyclinics = polyclinics.sort((a, b) => a.name.localeCompare(b.name));

return (
    <>
        <main className="body1">
            <section className="hero">
                <div className="hero-content">
                    <h1>All for Health, Health for All</h1>
                    <p>Dünya sağlık örgütünün 77. "Herkes için Sağlık" kurul toplantısı Birleşmiş Milletler önderliğinde gerçekleşiyor.</p>
                    <a href="/Blog" className="hero-button">Detaylı Bilgi İçin</a>
                </div>
                <div className="hero-image">
                    <img src="./src/assets/kurul2.png" alt="Doc!" />
                </div>
            </section>
            <br />
            <div className="specialties-container">
                <h2 className="title">Her Zaman Yanınızdayız</h2>
                <h1 className="subtitle">Alanlarımız</h1>
                <div className="grid1">
                    {sortedPolyclinics.map((polyclinic, index) => (
                        <div className="grid-item" key={index} onClick={() => selectPolyclinic(polyclinic)}>
                            <img src="./src/assets/heart.png" alt="resim"/>
                            <p>{polyclinic.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isShowDoctorsPopup && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setIsShowDoctorsPopup(false)}>
                    &times;
                  </span>
                  <h2>{selectedPolyclinic.name} Doktorları</h2>
                  <div className="doctor-grid">
                    {doctors.map((doctor, index) => (
                      <div className="doctor-card" key={index}>
                        <p>{doctor.speciality + " " + doctor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <section className="hastaneyonetim">
            <h2 className="title2">Uzman Kadromuzla Beraber</h2>
            <h1 className="subtitle2">Yöneticilerimiz</h1> 
                <div className="yonetim-container">   
                    <div className="yonetim-content">
                            <div className="yonetim-card">
                                <img className="yonetim-card-background" src={Irem} alt="resima1" />
                                <div className="yonetim-name-background-parent">
                                    <div className="yonetim-name-background" />
                                        <div className="yonetim-name-wrapper">
                                            <div className="yonetim-name">
                                                Başhekim Ayşe İrem Erkan
                                                </div>
                                                </div>
                                                <div className="yonetim-parent">
                                                <b className="yonetim">
                                                Hastane yönetimi ve düzeninden sorumlu kişi
                                                </b>
                                            <div className="frame-wrapper1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="yonetim-content">
                            <div className="yonetim-card">
                                <img className="yonetim-card-background" src={Faruk1Resim} alt="resima1" />
                                <div className="yonetim-name-background-parent">
                                    <div className="yonetim-name-background" />
                                        <div className="yonetim-name-wrapper">
                                            <div className="yonetim-name">
                                                Başhekim Ömer Faruk Yaşar
                                                </div>
                                                </div>
                                                <div className="yonetim-parent">
                                                <b className="yonetim">
                                                Hastane yönetimi ve düzeninden sorumlu kişi
                                                </b>
                                            <div className="frame-wrapper1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                <div className="yonetim-content">
                            <div className="yonetim-card">
                                <img className="yonetim-card-background" src={Faruk1Resim} alt="resima1" />
                                <div className="yonetim-name-background-parent">
                                    <div className="yonetim-name-background" />
                                        <div className="yonetim-name-wrapper">
                                            <div className="yonetim-name">
                                                Başhekim Esat Dündar
                                                </div>
                                                </div>
                                                <div className="yonetim-parent">
                                                <b className="yonetim">
                                                Hastane yönetimi ve düzeninden sorumlu kişi
                                                </b>
                                            <div className="frame-wrapper1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </main>
    </>
);
}

export default WelcomePage;
