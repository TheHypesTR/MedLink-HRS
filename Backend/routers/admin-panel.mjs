import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { Report } from "../mongoose/schemas/reports.mjs";
import { DoctorAddValidation } from "../utils/validation-schemas.mjs";
import { UserLoginCheck, UserPermCheck, PolyclinicFinder, DoctorFinder, AppointmentFinder, ReportFinder, LoadLanguage } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// Kullanıcıya Admin Yetkileri Veren API.
router.post("/admin/promote", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const userTC = request.body.TCno;
        const user = await LocalUser.findOne({ TCno: userTC });
        if(!user) return response.status(404).json({ ERROR: language.userNotFound });
        if(user.role === "Admin") return response.status(400).json({ ERROR: language.userAlreadyAdmin });

        user.role = "Admin";
        await user.save();
        return response.status(200).json({ STATUS: language.userPromoted });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.userNotPromoted, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastaneye Poliklinik Ekleme API'si. Aynı Polyclinic'ten Varsa Ekleme Yapmaz.
router.post("/admin/polyclinic/add", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { name, description } = request.body;
        let data = {};
        if(name) data.name = name;
        if(description) data.description = description;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.polyclinicNameReq });
        
        const polyclinic = await Polyclinic.findOne({ name: data.name });
        if(polyclinic) return response.status(400).json({ ERROR: language.polyclinicAlreadyExists });

        const newPolyclinic = new Polyclinic({ name: data.name, description: data.description });
        await newPolyclinic.save();
        return response.status(200).json({ STATUS: language.polyclinicAdded });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniği Düzenleme API'si.
router.put("/admin/polyclinic/:polyclinicID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinicID = request.params.polyclinicID;
        const polyclinic = await PolyclinicFinder(polyclinicID, request);
        
        const { name, description } = request.body;
        let data = {};
        if(name) data.name = name;
        if(description) data.description = description;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.polyclinicNameReq });
        
        await Polyclinic.updateOne(polyclinic, { $set: data }, { new: true });
        await Doctor.updateMany({ polyclinicID: polyclinicID }, { $set: { polyclinic: name }, new: true });
        return response.status(200).json({ STATUS: language.polyclinicUpdated });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniği Silme API'si.
router.delete("/admin/polyclinic/:polyclinicID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinicID = request.params.polyclinicID;        
        const polyclinic = await PolyclinicFinder(polyclinicID, request);
        await Polyclinic.deleteOne(polyclinic);
        await Doctor.deleteMany({ polyclinicID: polyclinic._id });
        return response.status(200).json({ STATUS: language.polyclinicDeleted });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğine Doktor Ekleme API'si. Aynı Poliklinikteki Doktor İsimleri Aynı Olamaz.
router.post("/admin/polyclinic/:polyclinicID/doctor/add", UserLoginCheck, UserPermCheck, checkSchema(DoctorAddValidation), async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const polyclinicID = request.params.polyclinicID;
        const polyclinic = await PolyclinicFinder(polyclinicID, request);
        
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ ERROR: errors.array() });

        const data = matchedData(request);
        const doctor = await Doctor.findOne({ polyclinicID: polyclinicID, name: data.name });
        if(doctor) return response.status(400).json({ ERROR: language.doctorAlreadyExists });
        
        const newDoctor = new Doctor({ polyclinicID: polyclinicID, polyclinic: polyclinic.name, name: data.name, speciality: data.speciality });
        await newDoctor.save();
        return response.status(200).json({ STATUS: language.doctorAdded });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
})

// ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorunun Bilgilerini Düzenleme API'si.
router.put("/admin/polyclinic/:polyclinicID/doctor/:doctorID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        const doctor = await DoctorFinder(polyclinicID, doctorID, request);

        const { name, speciality } = request.body;
        let data = {};
        if(name) data.name = name;
        if(speciality) data.speciality = speciality;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dataNotFound });

        await Doctor.findOneAndUpdate(doctor, { $set: data }, { new: true });
        return response.status(200).json({ STATUS: language.doctorUpdated });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorunu Silme API'si.
router.delete("/admin/polyclinic/:polyclinicID/doctor/:doctorID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        const doctor = await DoctorFinder(polyclinicID, doctorID, request);
        await Doctor.deleteOne(doctor);
        await Appointment.deleteMany({ doctorID: doctorID });
        await Report.deleteMany({ doctorID: doctorID });
        return response.status(200).json({ STATUS: language.doctorDeleted });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğinin ID'si Verilen Doktoruna Randevu Ekleme API'si.
router.post("/admin/polyclinic/:polyclinicID/doctor/:doctorID/appointment/add", UserLoginCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        await DoctorFinder(polyclinicID, doctorID, request);

        const { date, time } = request.body;
        let data = {};
        if(date) data.date = date;
        if(time) data.time = time; 
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dateReq });
        if(new Date(data.date) < new Date() || new Date(data.date) > new Date(Date.now() + 1000 * 60 * 60 * 24 * 31 * 7)) return response.status(400).json({ ERROR: language.invalidDate });
        
        const appointment = await Appointment.findOne({ doctorID: doctorID, date: data.date});
        if(appointment) return response.status(400).json({ ERROR: language.appointmentAlreadyExists });

        const newAppointment = new Appointment({ doctorID: doctorID, ...data});
        await newAppointment.save();
        return response.status(201).json({ STATUS: language.appointmentAdded });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Randevusunu Düzenleme API'si.
router.put("/admin/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(polyclinicID, request);
        const appointment = await AppointmentFinder(doctorID, appointmentID, request);

        const time = request.body.time;
        let data = {};
        if(time) data.time = time;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.appointmentTimeReq });

        await Appointment.findOneAndUpdate(appointment, { $set: data }, { new: true });
        return response.status(200).json({ STATUS: language.appointmentUpdated });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Randevusunu Silme API'si.
router.delete("/admin/doctor/:doctorID/appointment/:appointmentID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(polyclinicID, request);
        const appointment = await AppointmentFinder(doctorID, appointmentID, request);
        await Appointment.deleteOne(appointment);
        return response.status(200).json({ STATUS: language.appointmentDeleted });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun Raporlarını Listeleme API'si.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/report", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        const doctor = await DoctorFinder(polyclinicID, doctorID, request);

        const reports = await Report.find({ doctorID: doctor });
        if(reports.length === 0) return response.status(404).json({ ERROR: language.reportNotListing });
        return response.status(200).json(reports);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun ID'si Belirtilen Raporunu Listeleme API'si.
router.get("/polyclinic/:polyclinicID/doctor/:doctorID/report/:reportID", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID, reportID } = request.params;
        await PolyclinicFinder(polyclinicID, request);
        const report = await ReportFinder(doctorID, reportID, request);
        if(!report) return response.status(404).json({ ERROR: language.reportNotFound });
        return response.status(200).json(report);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun İzin Raporunu Güncelleştirme API'si.
router.post("/admin/polyclinic/:polyclinicID/doctor/:doctorID/giveReport", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { polyclinicID, doctorID } = request.params;
        const doctor = await DoctorFinder(polyclinicID, doctorID, request);

        const { type, startDay, endDay } = request.body;
        let data = {};
        if(type) data.type = type;
        if(startDay) data.startDay = startDay;
        if(endDay) data.endDay = endDay;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dataNotFound });
        if(startDay > endDay) return response.status(400).json({ ERROR: language.invalidReportDuration });
        if(startDay < Date.now()) return response.status(400).json({ ERROR: language.invalidReportDuration });

        const overlappingReports = await Report.find({ doctorID: doctor._id, $or: [
                { startDay: { $lte: endDay }, endDay: { $gte: startDay } },
                { startDay: { $gte: startDay, $lte: endDay } },
                { endDay: { $gte: startDay, $lte: endDay } }]});
                
        if (overlappingReports.length > 0) return response.status(400).json({ ERROR: language.reportOverlap });

        const report = new Report({ doctorID: doctor._id, ...data });
        await report.save();
        return response.status(201).json({ STATUS: language.reportAdded });
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Raporunu Silme API'si.
router.delete("/admin/doctor/:doctorID/report/:reportID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const { doctorID, reportID } = request.params;
        const report = await ReportFinder(doctorID, reportID, request);
        await Report.deleteOne(report);
        return response.status(200).json({ STATUS: language.reportDeleted });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;