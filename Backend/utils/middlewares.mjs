import { Hospital } from "../mongoose/schemas/hospitals.mjs";

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
})

// Kullanıcının Yetki Seviyesini Kontrol Eder Eğer Yetki Dışındaysa Yönlendirme Yapar.
export const UserPermCheck = ((request, response, next) => {
    const user = request.user;
    if(!user) return response.redirect("/auth/login");

    if(user.role === "User") return response.redirect("/");
    next();
});

// Kullanıcı Hâli Hazırda Giriş Yapmışsa Ana Sayfaya Yönlendirme Yapar.
export const UserAlreadyLogged = ((request, response, next) => {
    const user = request.session.passport?.user;
    if(user) return response.redirect("/");
    next();
});

// ID'si Belirtilen Hastaneyi Bulan Fonksiyon.
export const HospitalFinder = async (hospitalID) => {
    try {
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) throw new Error("Hospital Not Found!!");
        return hospital;

    } catch (err) {
        throw err;
    }
};

// HospitalFinder ile Bulunan Hastanedeki ID'si Verilen Polikliniği Bulan Fonksiyon.
export const PolyclinicFinder = async (findedHospital, polyclinicID) => {
    try {
        const hospital = findedHospital;
        const polyclinic = hospital.polyclinics.find(polyclinic => (polyclinic._id == polyclinicID));
        if (!polyclinic) throw new Error("Polyclinic Not Found!!");
        return polyclinic;

    } catch (err) {
        throw err;
    }
};

// HospitalFinder ile Bulunan Hastanedeki ve PolyclinicFinder ile Bulunan Poliklinikteki ID'si Verilen Doktoru Bulan Fonksiyon.
export const DoctorFinder = async (findedPolyclinic, doctorID) => {
    try {
        const polyclinic = findedPolyclinic;
        const doctor = polyclinic.doctors.find(doctor => (doctor._id == doctorID));
        if(!doctor) throw new Error("Doctor Not Found!!");
        return doctor;

    } catch (err) {
        throw err;
    }
};