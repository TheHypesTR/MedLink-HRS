import React, { useState, useEffect } from 'react';
import config from '../config.mjs';
import './AdminPanel.css';

function AdminPanel() {
  const [polyclinics, setPolyclinics] = useState([]);
  const [polyclinicName, setPolyclinicName] = useState("");
  const [polyclinicDescription, setPolyclinicDescription] = useState("");
  const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
  const [TCno, setTCno] = useState("");
  const [isPolyclinicPopupOpen, setIsPolyclinicPopupOpen] = useState(false);
  const [isPromoteUserPopupOpen, setIsPromoteUserPopupOpen] = useState(false);
  
  // Kullanıcıya Admin Yetkileri Veren API.
  const promoteUser = async (e) => {
    try {
        e.preventDefault();
        if(TCno) {
            await fetch(`http://localhost:${config.PORT}/admin/promote`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  TCno: TCno,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) {
                    alert(data.ERROR);
                }
                if(data.STATUS) {
                    alert(data.STATUS);
                    setTCno("");
                    setIsPromoteUserPopupOpen(false);
                }
            })
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
    }
  };

  // Sayfa Açıldığında Poliklinikleri Listeleyen API.
  useEffect(() => {
    polyclinicControl();
  }, []);

  // DB'den Poliklinkleri Listeleyen API.
  const polyclinicControl = () => {
    fetch(`http://localhost:${config.PORT}/polyclinic`, {
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
          setPolyclinics([]);
        } else {
          setPolyclinics(data);
        }
      })
      .catch((err) => console.log(err));
  };

  // Poliklinik Ekleme API'si.
  const addPolyclinic = async (e) => {
    const formData = {
        name: polyclinicName,
        description: polyclinicDescription,
    };
    
    try {
        e.preventDefault();
        let errorMessage = "";
        
        if(polyclinicName && polyclinicDescription) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) {
                    Array.isArray(data.ERROR) ? errorMessage = data.ERROR.map(err => err.msg).join("\n") : errorMessage = data.ERROR;
                    alert(errorMessage);
                }
                if(data.STATUS) {
                    alert(data.STATUS);
                    polyclinicControl();
                    setPolyclinicName("");
                    setPolyclinicDescription("");
                    setIsPolyclinicPopupOpen(false);
                }
            })
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  // Seçilen Polikliniği Silme API'si.
  const polyclinicDelete = () => {
    fetch(`http://localhost:${config.PORT}/polyclinic/${selectedPolyclinic}/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
        } else {
          alert(data.STATUS)
          polyclinicControl();
        }
      })
      .catch((err) => console.log(err));
  };

  // Seçilen Polikliniği Düzenleme API'si.
  const polyclinicUpdate = () => {
    fetch(`http://localhost:${config.PORT}/polyclinic/${selectedPolyclinic}/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
        } else {
          alert(data.STATUS)
          polyclinicControl();
        }
      })
      .catch((err) => console.log(err));
  };

  
  return(
      <>
      <div>
        <button className="open-popup-button" onClick={() => setIsPromoteUserPopupOpen(true)}>
          Kullanıcı Yetkilendirmesi
        </button>
        {isPromoteUserPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={() => setIsPromoteUserPopupOpen(false)}>X</button>
              <div className="popup-content">
                <h3>Admin Yetkilendirmesi</h3>
                <form onSubmit={promoteUser}>
                  <input
                    type="text"
                    placeholder='T.C No Giriniz'
                    className='input-box'
                    value={TCno}
                    onChange={(e) => setTCno(e.target.value)}
                    required
                  />
                  <button type='submit' className='button'>Yetkilendir</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <button className="open-popup-button" onClick={() => setIsPolyclinicPopupOpen(true)}>
          Poliklinik Ekle
        </button>
        {isPolyclinicPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={() => setIsPolyclinicPopupOpen(false)}>X</button>
              <div className="popup-content">
                <h3>Poliklinik Ekle</h3>
                <form onSubmit={addPolyclinic}>
                  <input
                    type="text"
                    placeholder='Poliklinik adı giriniz'
                    className='input-box'
                    required
                    value={polyclinicName}
                    onChange={(e) => setPolyclinicName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder='Poliklinik açıklaması giriniz'
                    className='input-box'
                    required
                    value={polyclinicDescription}
                    onChange={(e) => setPolyclinicDescription(e.target.value)}
                  />
                  <button type='submit' className='button'>Poliklinik Ekle</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='listepanel'>
        <h2>Poliklinik Listesi</h2>
        <ul>
          {polyclinics.map((clinic, index) => (
            <li key={index} className='li1'>
              <div className="poliklinik-ad">{clinic.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminPanel;