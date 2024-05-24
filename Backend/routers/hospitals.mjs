import { Router } from "express";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { PolyclinicFinder, DoctorFinder, AppointmentFinder, LoadLanguage } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// ID'si Belirtilen Hastanedeki Poliklinikleri Listeleyen API.
router.get("/polyclinic", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinics = await Polyclinic.find();
        if(!polyclinics || polyclinics.length === 0) return response.status(404).json({ ERROR: language.polyclinicNotListing });
        return response.status(200).json(polyclinics);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Listeleyen API.
router.get("/polyclinic/:polyclinicID", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinicID = request.params.polyclinicID
        const polyclinic = await PolyclinicFinder(polyclinicID, request);
        return response.status(200).json(polyclinic);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki Doktorları Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinicID = request.params.polyclinicID;
        await PolyclinicFinder(polyclinicID, request);

        const doctors = await Doctor.find({ polyclinicID: polyclinicID });
        if(!doctors || doctors.length === 0) return response.status(404).json({ ERROR: language.doctorNotListing });
        return response.status(200).json(doctors);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktoru Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        const doctor = await DoctorFinder(polyclinicID, doctorID, request);
        return response.status(200).json(doctor);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun Randevularını Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/appointment", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        await DoctorFinder(polyclinicID, doctorID, request);

        const appointments = await Appointment.find({ doctorID: doctorID });
        if(!appointments || appointments.length === 0) return response.status(400).json({ ERROR: language.appointmentNotListing });
        return response.status(200).json(appointments);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun ID'si Belirtilen Randevusunu Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentID", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(polyclinicID, request);
        const appointment = await AppointmentFinder(doctorID, appointmentID, request);
        return response.status(200).json(appointment);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;