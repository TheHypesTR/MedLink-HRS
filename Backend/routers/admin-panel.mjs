import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { Report } from "../mongoose/schemas/reports.mjs";
import { HospitalAddValidation, DoctorAddValidation } from "../utils/validation-schemas.mjs";
import { UserLoginCheck, UserPermCheck, HospitalFinder, PolyclinicFinder, DoctorFinder, AppointmentFinder, ReportFinder } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// Aktif Görüntüleme Dili.
let language = turkish;

// Admin Karşılama Ekranı.
router.get("/admin", UserLoginCheck, UserPermCheck, (request, response) => {
    return response.status(200).send(`Welcome Back ${request.user.name} Admin!!`);
});

// Kullanıcıya Admin Yetkileri Veren API.
router.post("/admin/promote", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const userTC = request.body.TCno;
        const user = await LocalUser.findOne({ TCno: userTC });
        if(!user) return response.status(404).json({ ERROR: language.userNotFound });
        if(user.role === "Admin") return response.status(400).json({ ERROR: language.userAlreadyAdmin });

        user.role = "Admin";
        await user.save();
        return response.status(200).send(language.userPromoted);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.userNotPromoted, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve MongoDB'ye Ekleme yapıyor.
router.post("/admin/hospital/add", UserLoginCheck, UserPermCheck, checkSchema(HospitalAddValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ ERROR: errors.array() });

        const data = matchedData(request);
        const hospital = await Hospital.findOne({ name: data.name, city: data.city, district: data.district });
        if(hospital) return response.status(400).json({ ERROR: language.hospitalAlreadyExists });

        const newHospital = new Hospital(data);
        await newHospital.save();
        return response.status(201).send(language.hospitalAdded);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.hospitalNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Hastane Bilgilerini Düzenleme API'si. Sadece Hastaneye Ait Girilen Değerleri Günceller!
router.put("/admin/hospital/:hospitalID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await HospitalFinder(hospitalID);

        const { city, district, name, address } = request.body;
        let data = {};
        if(city) data.city = city;
        if(district) data.district = district;
        if(name) data.name = name;
        if(address) data.address = address;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dataNotFound });
        
        await Hospital.updateOne(hospital, { $set: data }, { new: true });
        return response.status(200).send(language.hospitalUpdated);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.hospitalNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Hastane Silme API'si. Hastane ID'si Adress Çubuğundan Çekilir ve MongoDB'de Karşılık Bulan Hastaneyi Siler.
router.delete("/admin/hospital/:hospitalID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await HospitalFinder(hospitalID);
        await Hospital.deleteOne(hospital);
        return response.status(200).send(language.hospitalDeleted);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.hospitalNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastaneye Poliklinik Ekleme API'si. Aynı Polyclinic'ten Varsa Ekleme Yapmaz.
router.post("/admin/hospital/:hospitalID/polyclinic/add", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        await HospitalFinder(hospitalID);
        
        const polyclinicName = request.body.name;
        let data = {};
        if(polyclinicName) data.name = polyclinicName;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.polyclinicNameReq });
        
        const polyclinic = await Polyclinic.findOne({ hospitalID: hospitalID, name: data.name });
        if(polyclinic) return response.status(400).json({ ERROR: language.polyclinicAlreadyExists });

        const newPolyclinic = new Polyclinic({ hospitalID: hospitalID, name: data.name });
        await newPolyclinic.save();
        return response.status(200).send(language.polyclinicAdded);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Düzenleme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        const polyclinic = await PolyclinicFinder(hospitalID, polyclinicID);
        
        const polyclinicName = request.body.name;
        let data = {};
        if(polyclinicName) data.name = polyclinicName;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.polyclinicNameReq });
        
        await Polyclinic.updateOne(polyclinic, { $set: data }, { new: true });
        return response.status(200).send(language.polyclinicUpdated);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;        
        const polyclinic = await PolyclinicFinder(hospitalID, polyclinicID);
        await Polyclinic.deleteOne(polyclinic);
        return response.status(200).send(language.polyclinicDeleted);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.polyclinicNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğine Doktor Ekleme API'si. Aynı Poliklinikteki Doktor İsimleri Aynı Olamaz.
router.post("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/add", UserLoginCheck, UserPermCheck, checkSchema(DoctorAddValidation), async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        const doctor = await Doctor.findOne({ polyclinicID: polyclinicID, name: data.name });
        if(doctor) return response.status(400).json({ ERROR: language.doctorAlreadyExists });
        
        const newDoctor = new Doctor({ polyclinicID: polyclinicID, name: data.name, speciality: data.speciality });
        await newDoctor.save();
        return response.status(200).send(language.doctorAdded);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
})

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorunun Bilgilerini Düzenleme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);

        const { name, speciality } = request.body;
        let data = {};
        if(name) data.name = name;
        if(speciality) data.speciality = speciality;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dataNotFound });

        await Doctor.findOneAndUpdate(doctor, { $set: data }, { new: true });
        return response.status(200).send(language.doctorUpdated);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorunu Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);
        await Doctor.deleteOne(doctor);
        return response.status(200).send(language.doctorDeleted);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.doctorNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Verilen Doktoruna Randevu Ekleme API'si.
router.post("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/appointment/add", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        await DoctorFinder(polyclinicID, doctorID);

        const { date, time } = request.body;
        let data = {};
        if(date) data.date = date;
        if(time) data.time = time; 
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dateReq });

        const appointment = await Appointment.findOne({ doctorID: doctorID, date: data.date });
        if(appointment) return response.status(400).json({ ERROR: language.appointmentAlreadyExists });

        const newAppointment = new Appointment({ doctorID: doctorID, data });
        await newAppointment.save();
        return response.status(201).send(language.appointmentAdded);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Randevusunu Düzenleme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const appointment = await AppointmentFinder(doctorID, appointmentID);

        const time = request.body.time;
        let data = {};
        if(time) data.time = time;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.appointmentTimeReq });

        await Appointment.findOneAndUpdate(appointment, { $set: data }, { new: true });
        return response.status(200).send(language.appointmentUpdated);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotUpdating, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Randevusunu Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/appointment/:appointmentID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID, appointmentID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const appointment = await AppointmentFinder(doctorID, appointmentID);
        await Appointment.deleteOne(appointment);
        return response.status(200).send(language.appointmentDeleted);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.appointmentNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun Raporlarını Listeleme API'si.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/report", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);

        const reports = await Report.find({ doctorID: doctor });
        if(reports.length === 0) return response.status(404).json({ ERROR: language.reportNotListing });
        return response.status(200).json(reports);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun ID'si Belirtilen Raporunu Listeleme API'si.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/report/:reportID", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID, reportID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const report = await ReportFinder(doctorID, reportID);
        if(!report) return response.status(404).json({ ERROR: language.reportNotFound });
        return response.status(200).json(report);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotListing, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun İzin Raporunu Güncelleştirme API'si.
router.post("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/giveReport", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);

        const { type, day, startDay } = request.body;
        let data = {};
        if(type) data.type = type;
        if(day) data.day = day;
        if(startDay) data.startDay = startDay;
        if(Object.keys(data).length === 0) return response.status(400).json({ ERROR: language.dataNotFound });
        if(data.day < 1) return response.status(400).json({ ERROR: language.invalidReportDuration });
        
        data.startDay = data.startDay || new Date(Date.now() + 1000 * 60 * 60 * 3);
        data.endDay = new Date(data.startDay.getTime() + (data.day * 1000 * 60 * 60 * 24));
        const report = new Report({ doctorID: doctor._id, ...data });
        await report.save();
        return response.status(201).send(language.reportAdded);
        
    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotAdding, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin ID'si Belirtilen Doktorununun ID'si Belirtilen Raporunu Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/report/:reportID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID, reportID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const report = await ReportFinder(doctorID, reportID);
        await Report.deleteOne(report);
        return response.status(200).send(language.reportDeleted);

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.reportNotDeleting, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;