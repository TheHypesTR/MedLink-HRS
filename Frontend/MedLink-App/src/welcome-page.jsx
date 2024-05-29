/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import config from "../config.mjs";
import "./welcome-page.css";
import DefaultCard from "./assets/logo.png";

function WelcomePage() {
  const [polyclinics, setPolyclinics] = useState([]);

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
                        <div className="grid-item" key={index}>
                            <img src="./src/assets/heart.png" alt="resim"/>
                            <p>{polyclinic.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <section className="hastaneyonetim">
            <h2 className="title2">Uzman Kadromuzla Beraber</h2>
            <h1 className="subtitle2">Yöneticilerimiz</h1> 
                <div className="yonetim-container">   
                    <div className="yonetim-content">
                            <div className="yonetim-card">
                                <img className="yonetim-card-background" src={DefaultCard} alt="resima1" />
                                <div className="yonetim-name-background-parent">
                        <div className="yonetim-name-background" />
                            <div className="yonetim-name-wrapper">
                                <div className="yonetim-name">
                                    Yönetim İsim
                                </div>
                            </div>
                            <div className="yonetim-parent">
                                <b className="yonetim">
                                    Yönetim Açıklaması
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
