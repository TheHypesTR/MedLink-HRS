import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";

// API'lerin Metod'ları ve Url'larının Konsol Çıktılarını Verir.
export const logMiddleware = ((request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
});

// Kullanıcı Girişi Yoksa Sitenin Belirli Kısımlarına Eriştirtmez ve /Login Ekranına Yönlendirme Yapar.
export const UserLoginCheck = ((request, response, next) => {
    const user = request.session.passport?.user;
    if(!user) return response.redirect("/auth/login");
    next();
});

// Kullanıcı Hâli Hazırda Giriş Yapmışsa Ana Sayfaya Yönlendirme Yapar.
export const UserAlreadyLogged = ((request, response, next) => {
    const user = request.session.passport?.user;
    if(user) return response.redirect("/");
    next();
});

// Kullanıcının Yetki Seviyesini Kontrol Eder Eğer Yetki Dışındaysa Yönlendirme Yapar.
export const UserPermCheck = ((request, response, next) => {
    const user = request.user;
    if(!user) return response.redirect("/auth/login");

    if(user.role === "User") return response.redirect("/");
    next();
});

// ID'si Belirtilen Hastaneyi Bulan Fonksiyon.
export const HospitalFinder = async (hospitalID) => {
    try {
        if(hospitalID.length !== 24) throw new Error("Invalid HospitalID!!");
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) throw new Error("Hospital Not Found!!");
        return hospital;

    } catch (err) {
        throw err;
    }
};

// Hastanede ID'si Verilen Polikliniği Bulan Fonksiyon.
export const PolyclinicFinder = async (hospitalID, polyclinicID) => {
    try {
        if(hospitalID.length !== 24 || polyclinicID.length !== 24) throw new Error("Invalid Hospital-ID or Polyclinic-ID!!");
        const polyclinic = await Polyclinic.findOne({ hospitalID: hospitalID, _id: polyclinicID });
        if (!polyclinic) throw new Error("Polyclinic Not Found!!");
        return polyclinic;

    } catch (err) {
        throw err;
    }
};

// Poliklinik ID'si Verilen Doktoru Bulan Fonksiyon.
export const DoctorFinder = async (polyclinicID, doctorID) => {
    try {
        if(polyclinicID.length !== 24 || doctorID.length !== 24) throw new Error("Invalid Polyclinic-ID or Doctor-ID!!");
        const doctor = await Doctor.findOne({ polyclinicID: polyclinicID, _id: doctorID });
        if(!doctor) throw new Error("Doctor Not Found!!");
        return doctor;

    } catch (err) {
        throw err;
    }
};

// Doctor ID'si Verilen Randevuyu Bulan Fonksiyon.
export const AppointmentFinder = async (doctorID, appointmentID) => {
    try {
        if(doctorID.length !== 24 || appointmentID.length !== 24) throw new Error("Invalid Doctor-ID or Appointment-ID!!");
        const appointment = await Appointment.findOne({ doctorID: doctorID, _id: appointmentID });
        if(!appointment) throw new Error("Appointment Not Found!!");
        return appointment;

    } catch (err) {
        throw err;
    }
};