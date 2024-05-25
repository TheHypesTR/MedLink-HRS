import React, { useState } from 'react';
import './AdminPanel.css';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <><div>
      <button className="open-popup-button" onClick={togglePopup}>
        Kullanıcı Yetkilendirmesi
      </button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={togglePopup}>X</button>
            <div className="popup-content">
                <h3>Admin Yetkilendirmesi</h3>
              <input type="text" placeholder='T.C No Giriniz' className='input-box'/>
              <button type='submit' className='button'>Yetkilendir</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <div>
    <button className="open-popup-button" onClick={togglePopup}>
      Poliklinik Kontrol
    </button>
    {isOpen && (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-button" onClick={togglePopup}>X</button>
          <div className="popup-content">
              <h3>Poliklinik Ekle</h3>
            <input type="text" placeholder='Poliklinik adı giriniz' className='input-box'/>
            <input type="text" placeholder='Poliklinik açıklaması giriniz' className='input-box'/>
            <button type='submit' className='button'>Poliklinik Ekle</button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  <div className='listepanel'>
Poliklinik Listesi
<div>
    <ul>
        <li className='li1' onClick={togglePopup}>
            Poliklinik 1
            {isOpen && (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-button" onClick={togglePopup}>X</button>
          <div className="popup-content">
              <h3>Yardım Edin</h3>
            <input type="text" placeholder='Poliklinik adı giriniz' className='input-box'/>
            <input type="text" placeholder='Poliklinik açıklaması giriniz' className='input-box'/>
            <button type='submit' className='button'>Poliklinik Ekle</button>
          </div>
        </div>
      </div>
    )}
        </li>
        <li className='li1' onClick={togglePopup}>
            Poliklinik 2
        </li>  
    </ul>
    
</div>
  </div>
  </>
  );
};

export default Popup;
