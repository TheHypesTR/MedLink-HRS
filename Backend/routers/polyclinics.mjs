import { Router } from "express";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { Report } from "../mongoose/schemas/reports.mjs";
import { PolyclinicFinder, DoctorFinder, AppointmentFinder, LoadLanguage, UserLoginCheck } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// Poliklinikleri Listeleyen API.
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

// ID'si Belirtilen Polikliniği Listeleyen API.
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

// Tüm Polikliniklerdeki Doktorları Listeleyen API.
router.get("/doctor", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const doctors = await Doctor.find();
        if(!doctors || doctors.length === 0) return response.status(404).json({ ERROR: language.doctorNotListing });
        return response.status(200).json(doctors);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Poliklinikteki Doktorları Listeleyen API.
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

// ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktoru Listeleyen API.
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

// ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun Alınmış Randevularını Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/appointment", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        await DoctorFinder(polyclinicID, doctorID, request);
        const appointments = await Appointment.find({ doctorID: doctorID });
        if (!appointments || appointments.length === 0) return response.status(400).json({ ERROR: language.appointmentNotListing });

        let activeAppointments = [];
        for (const appointment of appointments) {
            let activeTimes = [];
            appointment.active.forEach((active, index) => {
                if (active !== false) activeTimes.push({
                    time: appointment.time[index],
                    active: active
                });
            });

            if (activeTimes.length > 0) activeAppointments.push({
                doctorID: doctorID,
                date: appointment.date,
                times: activeTimes
            });
        }
        if (activeAppointments.length === 0) return response.status(400).json({ ERROR: language.appointmentNotAvailable });
        return response.status(200).json(activeAppointments);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun ID'si Belirtilen Randevusunu Listeleyen API.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentDate", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID, appointmentDate } = request.params;
        await PolyclinicFinder(polyclinicID, request);
        const appointment = await AppointmentFinder(doctorID, appointmentDate, request);
        return response.status(200).json(appointment);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Kullanıcnın ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun Tarihi Belirtilen Randevusunu Oluşturan API.
router.post("/doctor/:doctorID/appointment/:appointmentDate/makeAppointment", UserLoginCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { doctorID, appointmentDate } = request.params;
        const { timeSlot } = request.body;
        const appointment = await AppointmentFinder(doctorID, appointmentDate, request);

        const user = request.user;
        if(!user) return response.status(400).json({ ERROR: language.userNotLoggedIn });

        const appointmentDay = new Date(appointmentDate);
        const overlappingReport = await Report.findOne({
            doctorID: doctorID,
            startDay: { $lte: appointmentDay },
            endDay: { $gte: appointmentDay }
        });

        if (overlappingReport) return response.status(400).json({ ERROR: language.doctorOnLeave });

        const timeIndex = appointment.time[timeSlot];
        if (!timeIndex) return response.status(400).json({ ERROR: language.invalidTimeSlot });
        if (appointment.active[timeSlot] !== false) return response.status(400).json({ ERROR: language.appointmentAlreadyTaken });
        const activeAppointments = appointment.active.filter(active => active === user.TCno);
        if (activeAppointments.length >= 1) return response.status(400).json({ ERROR: language.appointmentDuplicate });

        appointment.active[timeSlot] = user.TCno;
        await appointment.save();
        return response.status(200).json({ STATUS: language.appointmentMade });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Kullanıcının ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktorun Tarihi Belirtilen Randevusunu Silen API.
router.delete("/doctor/:doctorID/appointment/:appointmentDate/deleteAppointment", UserLoginCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { doctorID, appointmentDate } = request.params;
        const { timeSlot } = request.body;
        const appointment = await AppointmentFinder(doctorID, appointmentDate, request);
        const user = request.user;
        if(!user) return response.status(400).json({ ERROR: language.userNotLoggedIn });

        const timeIndex = appointment.time[timeSlot];
        if (!timeIndex) return response.status(400).json({ ERROR: language.invalidTimeSlot });
        if (appointment.active[timeSlot] !== user.TCno) return response.status(400).json({ ERROR: language.appointmentNotDeletingForUser });

        appointment.active[timeSlot] = false;
        await appointment.save();
        return response.status(200).json({ STATUS: language.appointmentDeleted });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotDeletingForUser, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Kullanıcı Oturum Açmış ise Randevularını Görüntüleyen API.
router.get("/user/appointments", UserLoginCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const user = request.user;
        if(!user) return response.status(400).json({ ERROR: language.userNotLoggedIn });
        const appointments = await Appointment.find({ active: user.TCno });
        if (!appointments || appointments.length === 0) return response.status(404).json({ ERROR: language.appointmentNotAvailable });

        const doctorIDs = appointments.map(appointment => appointment.doctorID).filter(id => id);
        const doctors = await Doctor.find({ _id: { $in: doctorIDs } });
        const doctorMap = doctors.reduce((acc, doctor) => {
            acc[doctor._id] = doctor;
            return acc;
        }, {});
        let userAppointments = appointments.map(appointment => {
            const doctor = doctorMap[appointment.doctorID];
            return {
                doctorID: appointment.doctorID,
                doctor: doctor ? doctor.speciality + " " + doctor.name : "Doktor",
                polyclinic: doctor ? doctor.polyclinic : "Poliklinik",
                date: appointment.date,
                time: appointment.time[appointment.active.indexOf(user.TCno)],
                timeSlot: appointment.active.indexOf(user.TCno)
            };
        });
        if (!userAppointments || userAppointments.length === 0) return response.status(404).json({ ERROR: language.appointmentNotAvailable });
        return response.status(200).json(userAppointments);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;