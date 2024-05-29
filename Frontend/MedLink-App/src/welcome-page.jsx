/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import config from "../config.mjs";
import "./welcome-page.css";

function WelcomePage() {

  useEffect(() => {
    CheckUser();
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
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Kulak Burun Boğaz</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Nefroloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Çocuk Sağlığı</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Dahiliye</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Nöroloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Üroloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Ruh Sağlığı</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Endokrin</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Onkoloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Gastroenteroloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Kardiyoloji</p>
            </div>
            <div className="grid-item">
                <img src="./src/assets/heart.png" alt="resim"/>
                <p>Ortopedi</p>
            </div>
            </div>
        </div>
        </main>

</>
  );
}

export default WelcomePage;
