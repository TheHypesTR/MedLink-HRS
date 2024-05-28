/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import config from '../config.mjs';
import './AdminPanel.css';

function AdminPanel() {
  const [TCno, setTCno] = useState("");
  const [polyclinics, setPolyclinics] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState(null);
  const [polyclinicName, setPolyclinicName] = useState("");
  const [polyclinicDescription, setPolyclinicDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpeciality, setDoctorSpeciality] = useState("");
  const [appointments, setAppointments] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reports, setReports] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");
  const [isPromoteUserPopupOpen, setIsPromoteUserPopupOpen] = useState(false);
  const [isPolyclinicAddPopupOpen, setIsPolyclinicAddPopupOpen] = useState(false);
  const [isPolyclinicEditPopupOpen, setIsPolyclinicEditPopupOpen] = useState(false);
  const [isDoctorAddPopupOpen, setIsDoctorAddPopupOpen] = useState(false);
  const [isDoctorEditPopupOpen, setIsDoctorEditPopupOpen] = useState(false);
  const [isAppointmentAddPopupOpen, setIsAppointmentAddPopupOpen] = useState(false);
  const [isShowAppointmentPopupOpen, setIsShowAppointmentPopupOpen] = useState(false);
  const [isReportAddPopupOpen, setIsReportAddPopupOpen] = useState(false);
  const [isShowReportPopupOpen, setIsShowReportPopupOpen] = useState(false);
  
  // Kullanıcıya Admin Yetkileri Veren API.
  const PromoteUser = async (e) => {
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
    ShowPolyclinics();
    ShowAllDoctors();
  }, []);

  // Database'den Poliklinkleri Listeleyen API.
  const ShowPolyclinics = () => {
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
        } 
        if(data) {
          setPolyclinics(data);
          GetDoctorCount();
        }
      })
      .catch((err) => console.log(err));
  };

  // Poliklinik Ekleme API'si.
  const AddPolyclinic = async (e) => {
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
                    // alert(data.STATUS);
                    ShowPolyclinics();
                    setPolyclinicName("");
                    setPolyclinicDescription("");
                    setIsPolyclinicAddPopupOpen(false);
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
  const DeletePolyclinic = (id) => {
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
          // alert(data.STATUS)
          ShowPolyclinics();
        }
      })

    } catch (err) {
      console.log(err);
    }
    
  };

  // Seçilen Polikliniği Düzenleme API'si.
  const UpdatePolyclinic = async (e) => {
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
          // alert(data.STATUS);
          setPolyclinicName("");
          setPolyclinicDescription("");
          setSelectedPolyclinic(null);
          setIsPolyclinicEditPopupOpen(false);
          ShowPolyclinics();
        }
      })

    } catch (err) {
      console.log(err);
    }
  };
  
  // Poliklinikleri Listeleme Fonksiyonu.
  const ShowPolyclinicss = () => {
    setDoctors([]);
    setSelectedPolyclinic(null);
    ShowPolyclinics();
    GetDoctorCount();
  };
  
  // Poliklinik Düzenleye Basıldığında Polikliniğin Bilgileri Kutucuklarda Hazır Olarak Getiren Fonksiyon.
  const OpenPolyclinicEditPopup = (polyclinic) => {
    setSelectedPolyclinic(polyclinic);
    setPolyclinicName(polyclinic.name);
    setPolyclinicDescription(polyclinic.description);
    setIsPolyclinicEditPopupOpen(true);
  };

  // Database'den Doktorları Çeken APİ.
  const ShowAllDoctors = () => {
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
  const ShowDoctors = (id) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${id}/doctor`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          if (doctors.length === 0)
            setIsDoctorAddPopupOpen(true);
          // alert(data.ERROR);
          ShowPolyclinicss();
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
  const AddDoctor = async (e) => {
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
                    // alert(data.STATUS);
                    setDoctorName("");
                    setDoctorSpeciality("");
                    setIsDoctorAddPopupOpen(false);
                    ShowDoctors(selectedPolyclinic);
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
  const DeleteDoctor = (doctor) => {
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
          ShowPolyclinicss();
        } 
        if(data.STATUS) {
          // alert(data.STATUS);
          ShowDoctors(doctor.polyclinicID);
        }
      })

    } catch (err) {
      console.log(err);
    }
  };

  // Seçilen Doktor Düzenleme API'si.
  const UpdateDoctor = async (e) => {
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
          // alert(data.STATUS);
          setDoctorName("");
          setDoctorSpeciality("");
          setSelectedDoctor(null);
          setIsDoctorEditPopupOpen(false);
          ShowDoctors(selectedDoctor.polyclinicID);
        }
      })
      
    } catch (err) {
      console.log(err);
    }
  };

  // Doktorları Düzenleye Basıldığında Doktorun Bilgileri Kutucuklarda Hazır Olarak Gelir.
  const OpenDoctorEditPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorName(doctor.name);
    setDoctorSpeciality(doctor.speciality);
    setIsDoctorEditPopupOpen(true);
  };

  // Doktorların Sayısını Görüntüleyen Fonksiyon.
  const GetDoctorCount = (polyclinicId) => {
    return allDoctors.filter(doctor => doctor.polyclinicID === polyclinicId).length;
  };
  
  // Seçilen Doktorun İzin Bilgilerini Görüntüleyen API.
  const ShowReports = (doctor) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${doctor.polyclinicID}/doctor/${doctor._id}/report`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          setReports([]);
        } 
        if (data) {
          setReports(data);
          setSelectedDoctor(doctor);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  // Randevu Ekleme API'si.
  const AddReport = async (e) => {
    try {
      const formData = {
        type: reportType,
        startDay: reportStartDate,
        endDay: reportEndDate,
      };

        e.preventDefault();        
        if(reportType && reportStartDate && reportEndDate) {
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
                    // alert(data.STATUS);
                    setReportStartDate("");
                    setReportEndDate("");
                    setReportType("");
                    setIsReportAddPopupOpen(false);
                    ShowReports(selectedDoctor);
                }
            });
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  // Seçilen İzni Silme API'si.
  const DeleteReport = (report) => {
    try {
      fetch(`http://localhost:${config.PORT}/admin/doctor/${report.doctorID}/report/${report._id}/delete`, {
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
          ShowDoctors(report.doctorID);
        } 
        if(data.STATUS) {
          // alert(data.STATUS);
          ShowReports(selectedDoctor);
        }
      })

    } catch (err) {
      console.log(err);
    }
  };

  // Rapor Ekleme Popup'ını Açan Fonksiyon.
  const OpenReportAddPopup = (doctor) => {
    setSelectedDoctor(doctor);
    AddReport();
    setIsReportAddPopupOpen(true);
  };


  // Doktorun Raporlarını Görüntüleyen Popup'ı Açan Fonksiyon.
  const ShowReportDetails = (doctor) => {
    setSelectedDoctor(doctor);
    ShowReports(doctor);
    setIsShowReportPopupOpen(true);
  };

  // Tarih Formatını Düzenleyen Fonksiyon.
  const RemoveTime = (str) => {
    return str.split('T')[0];
  };

  // Seçilen Doktorun Randevularını Görüntüleyen API.
  const ShowAppointments = (doctor) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${doctor.polyclinicID}/doctor/${doctor._id}/appointment`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          // alert(data.ERROR);
        } 
        if (data) {
          console.log(data);
          setAppointments(data);
          setSelectedDoctor(doctor);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  // Randevu Ekleme API'si.
  const AddAppointment = async (e) => {
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
                    return;
                }
                if(data.STATUS) {
                    // alert(data.STATUS);
                    setAppointmentDate("");
                    setIsAppointmentAddPopupOpen(false);
                }
                ShowAppointmentDetails(selectedDoctor);
            });
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");
        
    } catch (err) {
        console.log(err);
      }
  };

  // Seçilen Randevuyu Silme API'si.
  const DeleteAppointment = (appointment) => {
    console.log(appointment);
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    try {
      fetch(`http://localhost:${config.PORT}/admin/doctor/${appointment.doctorID}/appointment/${formattedDate}/delete`, {
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
          ShowDoctors(appointment.doctorID);
        } 
        if(data.STATUS) {
          // alert(data.STATUS);
          ShowAppointments(selectedDoctor);
        }
      })

    } catch (err) {
      console.log(err);
    }
  };

  // Randevu Ekleme Popup'ını Açan Fonksiyon.
  const OpenAppointmentAddPopup = (doctor) => {
    setSelectedDoctor(doctor);
    AddAppointment();
    setIsAppointmentAddPopupOpen(true);
    ShowAppointments(doctor);
  };

  // Randevuları Görüntüleyen Popup'ı Açan Fonksiyon.
  const ShowAppointmentDetails = (doctor) => {
    setSelectedDoctor(doctor);
    ShowAppointments(doctor);
    setIsShowAppointmentPopupOpen(true);
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
                <form onSubmit={PromoteUser}>
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
        {isPolyclinicAddPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={() => setIsPolyclinicAddPopupOpen(false)}>X</button>
              <div className="popup-content">
                <h3>Poliklinik Ekle</h3>
                <form onSubmit={AddPolyclinic}>
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
        <button className="addPol-button" onClick={() => setIsPolyclinicAddPopupOpen(true)}>Poliklinik Ekle</button>
        )}
        <div>
          {isDoctorAddPopupOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <button className="close-button" onClick={() => setIsDoctorAddPopupOpen(false)}>X</button>
                <div className="popup-content">
                  <h3>Doktor Ekle</h3>
                  <form onSubmit={AddDoctor}>
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
        <button className="back-button" onClick={ShowPolyclinicss}>Geri Dön</button>
      )}
        {doctors.length > 0 && (
          <button className="addDoc-button" onClick={() => setIsDoctorAddPopupOpen(true)} style={{ display: doctors.length > 0 ? 'block' : 'none' }}>Doktor Ekle</button>        
        )}
        <h2 id='baslikyazi2' style={doctors.length ? { paddingLeft: '20%' } : { paddingLeft: '28%' }}>
          {doctors.length ? 'Doktor Listesi' : 'Poliklinik Listesi'}
        </h2>
      </div>  
      <ul>
        {doctors && doctors.length ? (
          doctors.map((doctor, index) => (
            <li key={index} className="li1">
              {doctor.speciality + " " + doctor.name}
              <div className="button-container">
                <button className="show-button" onClick={() => ShowAppointmentDetails(doctor)}>Aktif Randevular</button>
                <button className="show-button" onClick={() => ShowReportDetails(doctor)}>Raporlar</button>
                <button className="edit-button" onClick={() => OpenDoctorEditPopup(doctor)}>Düzenle</button>
                <button className="delete-button" onClick={() => DeleteDoctor(doctor)}>Sil</button>
              </div>
            </li>
          ))
        ) : (
          polyclinics.map((polyclinic, index) => (
            <li key={index} className="li1">
              <span className="polyclinic-name">{polyclinic.name}</span>
              <span className="doctor-count">Doktor Sayısı: {GetDoctorCount(polyclinic._id)}</span>
              <div className="button-container">
                <button className="show-button" onClick={() => ShowDoctors(polyclinic._id)}>Doktorları Görüntüle</button>
                <button className="edit-button" onClick={() => OpenPolyclinicEditPopup(polyclinic)}>Düzenle</button>
                <button className="delete-button" onClick={() => DeletePolyclinic(polyclinic._id)}>Sil</button>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>
      {isShowReportPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsShowReportPopupOpen(false)}>X</button>
              <div className="popup-content">
              <button className="edit-button" onClick={() => OpenReportAddPopup(selectedDoctor)}>Rapor Ekle</button>
              <h3>Raporları Görüntüle</h3>
              <ul>
                {reports && reports.length ? (
                  reports.map((report, index) => (
                    <li key={index} className="li1">
                      <div className='reportShowType'>{report.type}</div>
                      <div className='reportShowStart'>Başlangıç: {RemoveTime(report.startDay)}</div>
                      <div className='reportShowEnd'>Bitiş: {RemoveTime(report.endDay)}</div>
                      <button className='delete-button' onClick={() => DeleteReport(report)}>Sil</button>
                    </li>
                  ))
                ) : (
                  <li>Herhangi bir rapor bulunamadı.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {isPolyclinicEditPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsPolyclinicEditPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Poliklinik Düzenle</h3>
              <form onSubmit={UpdatePolyclinic}>
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
              <form onSubmit={UpdateDoctor}>
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
      )}<div>
          {isShowAppointmentPopupOpen && (
              <div className="popup-overlay">
                  <div className="popup">
                      <button className="close-button" onClick={() => setIsShowAppointmentPopupOpen(false)}>X</button>
                      <div className="popup-content">
                        <h3>Randevuları Görüntüle</h3>
                        <ul>
                            {appointments && appointments.length ? (
                                appointments.map((appointment, index) => (
                                    <li key={index} className="li1">
                                        <div className='reportShowType'>{RemoveTime(appointment.date)}</div>
                                        <ul>
                                            {appointment.times.map((timeSlot, timeIndex) => (
                                                <li key={timeIndex}>
                                                    {timeSlot.time} - {timeSlot.active}
                                                </li>
                                            ))}
                                        </ul>
                                      <button className='delete-button' onClick={() => DeleteAppointment(appointment)}>Sil</button>
                                    </li>
                                ))
                            ) : (
                                <li>Herhangi bir randevu bulunamadı.</li>
                            )}
                        </ul>
                      </div>
                  </div>
              </div>
          )}
      </div>
      {isAppointmentAddPopupOpen && (<div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsAppointmentAddPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Aktif Randevuları Görüntüle</h3>
              <form onSubmit={AddAppointment}>
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
      {isReportAddPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setIsReportAddPopupOpen(false)}>X</button>
            <div className="popup-content">
              <h3>Rapor Ekle</h3>
              <form onSubmit={AddReport}>
                <textarea
                  placeholder='Raporu Tipini Giriniz'
                  className='input-box'
                  required
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                />
                <input
                  type="date"
                  placeholder='Rapor Başlangıç Tarihi'
                  className='input-box'
                  required
                  value={reportStartDate}
                  onChange={(e) => setReportStartDate(e.target.value)}
                />
                <input
                  type="date"
                  placeholder='Rapor Bitiş Tarihi'
                  className='input-box'
                  required
                  value={reportEndDate}
                  onChange={(e) => setReportEndDate(e.target.value)}
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