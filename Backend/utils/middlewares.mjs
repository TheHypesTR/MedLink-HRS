import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { Report } from "../mongoose/schemas/reports.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

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

// Polikliniği Bulan Fonksiyon.
export const PolyclinicFinder = async (polyclinicID, request) => {
    const language = loadLanguage(request);
    try {
        if(polyclinicID.length !== 24) throw new Error(language.invalidPolyclinicID);
        const polyclinic = await Polyclinic.findOne({ _id: polyclinicID });
        if (!polyclinic) throw new Error(language.polyclinicNotFound);
        return polyclinic;

    } catch (err) {
        throw err;
    }
};

// Poliklinik ID'si Verilen Doktoru Bulan Fonksiyon.
export const DoctorFinder = async (polyclinicID, doctorID, request) => {
    const language = loadLanguage(request);
    try {
        if(polyclinicID.length !== 24 || doctorID.length !== 24) throw new Error(language.invalidPolyclinicIDDoctorID);
        const doctor = await Doctor.findOne({ polyclinicID: polyclinicID, _id: doctorID });
        if(!doctor) throw new Error(language.doctorNotFound);
        return doctor;

    } catch (err) {
        throw err;
    }
};

// Doctor ID'si Verilen Randevuyu Bulan Fonksiyon.
export const AppointmentFinder = async (doctorID, appointmentID, request) => {
    const language = loadLanguage(request);
    try {
        if(doctorID.length !== 24 || appointmentID.length !== 24) throw new Error(language.invalidDoctorIDAppointmentID);
        const appointment = await Appointment.findOne({ doctorID: doctorID, _id: appointmentID });
        if(!appointment) throw new Error(language.appointmentNotFound);
        return appointment;

    } catch (err) {
        throw err;
    }
};

// Doctor ID'si Verilen Raporu Bulan Fonksiyon.
export const ReportFinder = async (doctorID, reportID, request) => {
    const language = loadLanguage(request);
    try {
        if(doctorID.length !== 24 || reportID.length !== 24) throw new Error(language.invalidDoctorIDReportID);
        const report = await Report.findOne({ doctorID: doctorID, _id: reportID });
        if(!report) throw new Error(language.reportNotFound);
        return report;

    } catch (err) {
        throw err;
    }
};

// Dil Bilgilerini Cookie'den Çeker ve Sayfalar İçin Günceller.
export const loadLanguage = (request) => {
    try {
        const language = request.signedCookies.language || "turkish";
        return language === "english" ? english : turkish;

    } catch (err) {
        console.error("Error loading language:", err);
        return turkish;
    }
};