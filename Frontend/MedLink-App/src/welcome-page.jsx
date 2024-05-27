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
          localStorage.setItem("user", data.name);
          localStorage.setItem("role", data.role);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
      <div class="news">
        <div class="news-item">
          <div class="news-content">
            <h2>Haber Başlığı 1</h2>
            <p>Haber içeriği 1</p>
          </div>
        </div>
      </div>
  );
}

export default WelcomePage;
