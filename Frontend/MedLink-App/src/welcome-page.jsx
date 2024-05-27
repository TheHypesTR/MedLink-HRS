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
        if (data.ERROR) {
          alert(data.ERROR);
        } 
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
</main>
<div class="specialties-container">
        <h2 class="title">Always Caring</h2>
        <h1 class="subtitle">Our Specialties</h1>
        <div class="grid">
            <div class="grid-item selected">
                <img src="path/to/icon.png" alt="Bones"/>
                <p>Bones</p>
            </div>
            <div class="grid-item">
                <img src="path/to/icon.png" alt="Neurology"/>
                <p>Neurology</p>
            </div>
            <div class="grid-item">
                <img src="path/to/icon.png" alt="Oncology"/>
                <p>Oncology</p>
            </div>
            </div>
        </div>


</>
  );
}

export default WelcomePage;
