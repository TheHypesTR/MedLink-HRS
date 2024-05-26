import React, { useState, useEffect } from 'react';
import config from '../config.mjs';
import './AdminPanel.css';

function AdminPanel() {
  const [TCno, setTCno] = useState("");
  const [polyclinics, setPolyclinics] = useState([]);
  const [polyclinicName, setPolyclinicName] = useState("");
  const [polyclinicDescription, setPolyclinicDescription] = useState("");
  const [selectedPolyclinic, setSelectedPolyclinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpeciality, setDoctorSpeciality] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [reportDay, setReportDay] = useState("");
  const [report, setReport] = useState("");
  const [isPromoteUserPopupOpen, setIsPromoteUserPopupOpen] = useState(false);
  const [isPolyclinicPopupOpen, setIsPolyclinicPopupOpen] = useState(false);
  const [isDoctorPopupOpen, setIsDoctorPopupOpen] = useState(false);
  const [isPolyclinicEditPopupOpen, setIsPolyclinicEditPopupOpen] = useState(false);
  const [isDoctorEditPopupOpen, setIsDoctorEditPopupOpen] = useState(false);
  const [isAppointmentPopupOpen, setIsAppointmentPopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  
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
    doctorControl();
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
  const polyclinicDelete = (id) => {
    try {
      fetch(`http://localhost:${config.PORT}/admin/polyclinic/${id}/delete`, {
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
        } 
        if(data.STATUS) {
          alert(data.STATUS)
          polyclinicControl();
        }
      })

    } catch (err) {
      console.log(err);
    }
    
  };

  // Seçilen Polikliniği Düzenleme API'si.
  const polyclinicUpdate = async (e) => {
    try {
      const formData = {
        name: polyclinicName,
        description: polyclinicDescription,
      };

      e.preventDefault();
      if (!selectedPolyclinic) return;
      await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedPolyclinic._id}/edit`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
        }
        if (data.STATUS) {
          alert(data.STATUS);
          setPolyclinicName("");
          setPolyclinicDescription("");
          setSelectedPolyclinic(null);
          setIsPolyclinicEditPopupOpen(false);
          polyclinicControl();
        }
      })

    } catch (err) {
      console.log(err);
    }
  };
  
  // Polyclinic Düzenleye Basıldığında Polikliniğin Bilgileri Kutucuklarda Hazır Olarak Gelir.
  const openEditPopup = (polyclinic) => {
    setSelectedPolyclinic(polyclinic);
    setPolyclinicName(polyclinic.name);
    setPolyclinicDescription(polyclinic.description);
    setIsPolyclinicEditPopupOpen(true);
  };

  // Database'den Doktorları Çeken APİ.
  const doctorControl = () => {
      try {
          fetch(`http://localhost:${config.PORT}/doctor`, {
              method: "GET",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
          })
          .then((response) => response.json())
          .then((data) => {
              if(data.ERROR) {
                  alert(data.ERROR);
                  setAllDoctors([]);
              }
              if(data)
                  setAllDoctors(data);
          });
      
      } catch (err) {
          console.log(err);
      }
  };

  // Seçilen Poliklinikteki Doktorları Görüntüleyen API.
  const showDoctor = (id) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${id}/doctor`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
          if (doctors.length === 0)
            setIsDoctorPopupOpen(true);
        } 
        if (data) {
          setDoctors(data);
          setSelectedPolyclinic(id);
          setPolyclinics([]);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  // Doktor Ekleme API'si.
  const addDoctor = async (e) => {
    const formData = {
        name: doctorName,
        speciality: doctorSpeciality,
    };
    
    try {
        e.preventDefault();
        let errorMessage = "";     
        if(doctorName && doctorSpeciality) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedPolyclinic}/doctor/add`, {
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
                    setDoctorName("");
                    setDoctorSpeciality("");
                    setIsDoctorPopupOpen(false);
                    showDoctor(selectedPolyclinic);
                }
            });
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  // Seçilen Doktoru Silme API'si.
  const doctorDelete = (doctor) => {
    try {
      fetch(`http://localhost:${config.PORT}/admin/polyclinic/${doctor.polyclinicID}/doctor/${doctor._id}/delete`, {
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
          showPolyclinics();
        } 
        if(data.STATUS) {
          alert(data.STATUS);
          showDoctor(doctor.polyclinicID);
        }
      })

    } catch (err) {
      console.log(err);
    }
  };

  // Seçilen Doktor Düzenleme API'si.
  const doctorUpdate = async (e) => {
    try {
      const formData = {
        name: doctorName,
        speciality: doctorSpeciality,
      };

      e.preventDefault();
      if (!selectedDoctor) return;
      await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/edit`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
        }
        if (data.STATUS) {
          alert(data.STATUS);
          setDoctorName("");
          setDoctorSpeciality("");
          setSelectedDoctor(null);
          setIsDoctorEditPopupOpen(false);
          showDoctor(selectedDoctor.polyclinicID);
        }
      })
      
    } catch (err) {
      console.log(err);
    }
  };

  // Doktorları Düzenleye Basıldığında Doktorun Bilgileri Kutucuklarda Hazır Olarak Gelir.
  const openDoctorEditPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorName(doctor.name);
    setDoctorSpeciality(doctor.speciality);
    setIsDoctorEditPopupOpen(true);
  };

  const getDoctorCount = (polyclinicId) => {
    return allDoctors.filter(doctor => doctor.polyclinicID === polyclinicId).length;
  };

  // Randevu Ekleme API'si.
  const addAppointment = async (e) => {
    try {
        e.preventDefault();        
        if(appointmentDate) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/appointment/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date: appointmentDate,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) {
                    alert(data.ERROR);
                }
                if(data.STATUS) {
                    alert(data.STATUS);
                    setAppointmentDate("");
                    setIsAppointmentPopupOpen(false);
                }
            });
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  const openAppointmentPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setIsAppointmentPopupOpen(true);
  };

  // Randevu Ekleme API'si.
  const addReport = async (e) => {
    try {
      const formData = {
        type: reportType,
        day: reportDay,
        startDay: reportDate,
      };

        e.preventDefault();        
        if(reportType && reportDay && reportDate) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/giveReport`, {
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
                    alert(data.ERROR);
                }
                if(data.STATUS) {
                    alert(data.STATUS);
                    setReportDate("");
                    setReportDay("");
                    setReportType("");
                    setIsReportPopupOpen(false);
                }
            });
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  const openReportPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setIsReportPopupOpen(true);
  };

  const showPolyclinics = () => {
    setDoctors([]);
    setSelectedPolyclinic(null);
    polyclinicControl();
  };

  return (
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
      <div style={{display: 'flex'}}>
        {doctors.length === 0 && (
        <button className="addPol-button" onClick={() => setIsPolyclinicPopupOpen(true)}>Poliklinik Ekle</button>
        )}
        <div>
          {isDoctorPopupOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <button className="close-button" onClick={() => setIsDoctorPopupOpen(false)}>X</button>
                <div className="popup-content">
                  <h3>Doktor Ekle</h3>
                  <form onSubmit={addDoctor}>
                    <input
                      type="text"
                      placeholder='Doktor uzmanlık alanı giriniz'
                      className='input-box'
                      required
                      value={doctorSpeciality}
                      onChange={(e) => setDoctorSpeciality(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder='Doktor adı giriniz'
                      className='input-box'
                      required
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                    />
                    <button type='submit' className='button'>Doktor Ekle</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        {doctors.length > 0 && (
        <button className="back-button" onClick={showPolyclinics}>Geri Dön</button>
      )}
        {doctors.length > 0 && (
          <button className="addDoc-button" onClick={() => setIsDoctorPopupOpen(true)} style={{ display: doctors.length > 0 ? 'block' : 'none' }}>Doktor Ekle</button>        
        )}
        <h2 style={doctors.length ? { paddingLeft: '20%' } : { paddingLeft: '28%' }}>
          {doctors.length ? 'Doktor Listesi' : 'Poliklinik Listesi'}
        </h2>
      </div>  
        <ul>
          {doctors && doctors.length ? (
            doctors.map((doctor, index) => (
              <li key={index} className='li1'>
                {doctor.speciality + " " + doctor.name}
                <div className="button-container">
                  <button className="edit-button" onClick={() => openDoctorEditPopup(doctor)}>Düzenle</button>
                  <button className="edit-button" onClick={() => doctorDelete(doctor)}>Sil</button>
                  <button className="edit-button" onClick={() => openAppointmentPopup(doctor)}>Randevu Ekle</button>
                  <button className="edit-button" onClick={() => openReportPopup(doctor)}>Rapor Ekle</button>
                </div>
              </li>
            ))
          ) : (
            polyclinics.map((polyclinic, index) => (
              <li key={index} className='li1'>
                <span className="polyclinic-name">{polyclinic.name}</span>
                <span className="doctor-count">(Doktor Sayısı: {getDoctorCount(polyclinic._id)})</span>
                <div className="button-container">
                  <button className="delete-button" onClick={() => polyclinicDelete(polyclinic._id)}>Sil</button>
                  <button className="edit-button" onClick={() => openEditPopup(polyclinic)}>Düzenle</button>
                  <button className="show-doctor-button" onClick={() => showDoctor(polyclinic._id)}>Doktorları Görüntüle</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {isPolyclinicEditPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsPolyclinicEditPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Poliklinik Düzenle</h3>
              <form onSubmit={polyclinicUpdate}>
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
                <button type='submit' className='button'>Poliklinik Düzenle</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isDoctorEditPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsDoctorEditPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Doktor Düzenle</h3>
              <form onSubmit={doctorUpdate}>
                <input
                  type="text"
                  placeholder='Doktor Uzmanlığı Giriniz'
                  className='input-box'
                  required
                  value={doctorSpeciality}
                  onChange={(e) => setDoctorSpeciality(e.target.value)}
                />
                <input
                  type="text"
                  placeholder='Doktor Adı Giriniz'
                  className='input-box'
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
                <button type='submit' className='button'>Doktor Düzenle</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isAppointmentPopupOpen && (<div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsAppointmentPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Randevu Ekle</h3>
              <form onSubmit={addAppointment}>
                <input
                  type="date"
                  className='input-box'
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
                <button type='submit' className='button'>Randevu Ekle</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isReportPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsReportPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Rapor Ekle</h3>
              <form onSubmit={addReport}>
                <textarea
                  placeholder='Raporu Tipini Giriniz'
                  className='input-box'
                  required
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                />
                <textarea
                  placeholder='İzin Süresi Giriniz (Gün)'
                  className='input-box'
                  required
                  value={reportDay}
                  onChange={(e) => setReportDay(e.target.value)}
                />
                <input
                  type="date"
                  placeholder='Raporu Tarihi'
                  className='input-box'
                  required
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
                <button type='submit' className='button'>Rapor Ekle</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;