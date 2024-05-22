import React from "react";
import './Appointment.css';

function Appointment() {
  return (
<div className="katman1-randevu">
    <p className="isim1">Poliklinik Seçiniz</p>
    <select className="polikliniksec">
     <option value="">id girisi <input type="text" placeholder="adwadsad" /></option>
    <option value="Poliklinik Seçiniz" id="boskutu"></option>
       {/* <option value="Çocuk Sağlığı ve Hastalıkları" className="poliklinikbar">Çocuk Sağlığı ve Hastalıkları</option>
        <option value="Dahiliye" className="poliklinikbar">Dahiliye</option>
        <option value="Endokrin" className="poliklinikbar">Endokrin</option>
        <option value="Gastroentoloji" className="poliklinikbar">Gastroentoloji</option>
        <option value="Kulak Burun Boğaz" className="poliklinikbar">Kulak Burun Boğaz</option>
        <option value="Nefroloji" className="poliklinikbar">Nefroloji</option>
        <option value="Nöroloji" className="poliklinikbar">Nöroloji</option>
        <option value="Onkoloji" className="poliklinikbar">Onkoloji</option>
        <option value="Ruh Sağlığı ve Hastalıkları" className="poliklinikbar">Ruh Sağlığı ve Hastalıkları</option>
  <option value="Üroloji" className="poliklinikbar">Üroloji</option> */}
    </select>
    
    <p className="isim1">Doktor Seçiniz</p>
    <select className="polikliniksec">
      <option value="">idgirisi doktor <input type="text" /></option>
        <option value="Doktor Seçiniz" id="boskutu"></option>
        <option value="Dr. Ahmet" className="doktorbar">Dr. Ahmet</option>
        <option value="Dr. Ayşe" className="doktorbar">Dr. Ayşe</option>
        <option value="Dr. Burak" className="doktorbar">Dr. Burak</option>
        <option value="Dr. Cem" className="doktorbar">Dr. Cem</option>
</select>
    
    <p className="isim1">Randevu Tarihi</p>
    <input type="date" id="randevutarihi" />

    <p className="isim1">Randevu Saati</p>
    <input type="time" id="randevusaati" />

    <button className="randevual" type="submit">Randevu Al</button>

</div>
  );
}

export default Appointment;
