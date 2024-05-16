import { Router } from "express";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { HospitalFinder, PolyclinicFinder, DoctorFinder, AppointmentFinder } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// Aktif Görüntüleme Dili.
let language = turkish;

// Tüm Hastaneleri MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
// İl Filtrelemesi Yapılabilir         : "/admin/Hospital?city=Konya"
// İlçe Filtrelemesi Yapılabilir       : "/admin/Hospital?district=Akşehir"
// İl ve İlçe Filtrelemesi Yapılabilir : "/admin/Hospital?city=Konya&district=Akşehir"
router.get("/hospital", async (request, response) => {
    try {
        const { city, district } = request.query;
        let filter = {};
        if(city) filter.city = city;
        if(district) filter.district = district;

        const hospitals = await Hospital.find(filter);
        if(!hospitals) return response.status(400).json({ ERROR: language.hospitalNotFound });
        if(hospitals.length === 0) return response.status(400).json({ ERROR: language.filter });
        return response.status(200).json(hospitals);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.hospitalNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastaneyi MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
router.get("/hospital/:hospitalID", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await HospitalFinder(hospitalID);
        return response.status(200).json(hospital);
    
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.hospitalNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki Poliklinikleri Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        await HospitalFinder(hospitalID);

        const polyclinics = await Polyclinic.find({ hospitalID: hospitalID });
        if(!polyclinics) return response.status(404).json({ ERROR: language.polyclinicNotListing });
        return response.status(200).json(polyclinics);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID", async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        const polyclinic = await PolyclinicFinder(hospitalID, polyclinicID);
        return response.status(200).json(polyclinic);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki Doktorları Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor", async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);

        const doctors = await Doctor.find({ polyclinicID: polyclinicID });
        if(!doctors) return response.status(404).json({ ERROR: language.doctorNotListing });
        return response.status(200).json(doctors);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktoru Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID", async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);
        return response.status(200).json(doctor);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun Randevularını Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/appointment", async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        await DoctorFinder(polyclinicID, doctorID);

        const appointments = await Appointment.find({ doctorID: doctorID });
        if(!appointments) return response.status(400).json({ ERROR: language.appointmentNotListing });
        return response.status(200).json(appointments);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun ID'si Belirtilen Randevusunu Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentID", async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const appointment = await AppointmentFinder(doctorID, appointmentID);
        return response.status(200).json(appointment);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;