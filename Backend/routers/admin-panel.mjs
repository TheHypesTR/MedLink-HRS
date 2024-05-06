import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { Appointment } from "../mongoose/schemas/appointment.mjs";
import { Report } from "../mongoose/schemas/reports.mjs";
import { HospitalAddValidation, DoctorAddValidation } from "../utils/validation-schemas.mjs";
import { UserLoginCheck, UserPermCheck, HospitalFinder, PolyclinicFinder, DoctorFinder } from "../utils/middlewares.mjs";

const router = Router();

// Admin Karşılama Ekranı.
router.get("/admin", UserLoginCheck, UserPermCheck, (request, response) => {
    return response.status(200).send(`Welcome Back ${request.user.name} Admin!!`);
});

// Kullanıcıya Admin Yetkileri Veren API.
router.post("/admin/promote", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const userTC = request.body.TCno;
        const user = await LocalUser.findOne({ TCno: userTC });
        if(!user) return response.status(404).send("User Not Found!!");
        if(user.role === "Admin") return response.status(400).send("This User Already Admin!!");

        user.role = "Admin";
        await user.save();
        return response.status(200).send("User Promote Successfully!!");

    } catch (err) {
        console.log(`User Promote ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("User Promote ERROR!!");
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve MongoDB'ye Ekleme yapıyor.
router.post("/admin/hospital/add", UserLoginCheck, UserPermCheck, checkSchema(HospitalAddValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        const hospital = await Hospital.findOne({ name: data.name, city: data.city, district: data.district });
        if(hospital) return response.status(400).send("Hospital Already Exists!!");

        const newHospital = new Hospital(data);
        await newHospital.save();
        return response.status(201).send("Hospital ADDED Successfully!!");

    } catch (err) {
        console.log(`Hospital ADDING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Hospital ADDING ERROR!!");
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
        if(Object.keys(data).length === 0) return response.status(400).send("Editing Cannot be Made Without Entering any Data!!");
        
        await Hospital.updateOne(hospital, { $set: data }, { new: true });
        return response.status(200).send("Hospital EDITED Successfully!!");
        
    } catch (err) {
        console.log(`Hospital EDITING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Hospital EDITING ERROR!!");
    }
});

// Hastane Silme API'si. Hastane ID'si Adress Çubuğundan Çekilir ve MongoDB'de Karşılık Bulan Hastaneyi Siler.
router.delete("/admin/hospital/:hospitalID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await HospitalFinder(hospitalID);
        await Hospital.deleteOne(hospital);
        return response.status(200).send("Hospital DELETED Successfully!!");
        
    } catch (err) {
        console.log(`Hospital DELETING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
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
        if(Object.keys(data).length === 0) return response.status(400).send("Polyclinic Name is Required!!");
        
        const polyclinic = await Polyclinic.findOne({ hospitalID: hospitalID, name: data.name });
        if(polyclinic) return response.status(400).send("Polyclinic Already Exists!!");

        const newPolyclinic = new Polyclinic({ hospitalID: hospitalID, name: data.name });
        await newPolyclinic.save();
        return response.status(200).send("Polyclinic ADDED Succesfully!!");
        
    } catch (err) {
        console.log(`Polyclinic ADDING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Polyclinic ADDING ERROR!!");
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
        if(Object.keys(data).length === 0) return response.status(400).send("Polyclinic Name is Required!!");
        
        await Polyclinic.updateOne(polyclinic, { $set: data }, { new: true });
        return response.status(200).send("Polyclinic EDITED Successfully!!");
        
    } catch (err) {
        console.log(`Polyclinic EDITING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Polyclinic EDITING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;        
        const polyclinic = await PolyclinicFinder(hospitalID, polyclinicID);
        await Polyclinic.deleteOne(polyclinic);
        return response.status(200).send("Polyclinic DELETED Succesfully!!");
        
    } catch (err) {
        console.log(`Polyclinic DELETING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Polyclinic DELETING ERROR!!");
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
        if(doctor) return response.status(400).send("Doctor Already Exists!!");
        
        const newDoctor = new Doctor({ polyclinicID: polyclinicID, name: data.name, speciality: data.speciality });
        await newDoctor.save();
        return response.status(200).send("Doctor ADDED Successfully!!");
        
    } catch (err) {
        console.log(`Doctor ADDING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor ADDING ERROR!!");
    }
})

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğinin IS'si Belirtilen Doktorunu Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await HospitalFinder(hospitalID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);
        await Doctor.deleteOne(doctor);
        return response.status(200).send("Doctor DELETED Successfully!!");
        
    } catch (err) {
        console.log(`Doctor DELETING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor DELETING ERROR!!");
    }
});

/*
// --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK ---
// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun İzin Raporunu Güncelleştirme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/giveReport", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        const doctor = await DoctorFinder(hospital, polyclinic, request.params.doctorID);

        const reportDay = request.body.reportDay;
        const reportStartingDay = request.body.reportStartingDay;
        if(reportDay < 1) return response.status(400).send("Invalid Report Duration!!");
        
        doctor.reportDay = reportDay || doctor.reportDay;
        doctor.reportStartingDay = reportStartingDay || new Date(Date.now() + 1000 * 60 * 60 * 3);
        doctor.reportEndingDay = new Date(doctor.reportStartingDay.getTime() + reportDay * 1000 * 60 * 60 * 24);
        await hospital.save();
        return response.status(200).send("Doctor Report UPDATED Successfully!!");
        
    } catch (err) {
        console.log(`Doctor Report UPDATING ERROR!! \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor Report UPDATING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniğin ID'si Belirtilen Doktorun Mesai Saatlerini Güncelleme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/setAppointmentTime", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        const doctor = await DoctorFinder(hospital, polyclinic, request.params.doctorID);

        let data = {};
        if(request.body.appointmentTime) data.appointmentTime = request.body.appointmentTime;
        if(Object.keys(data).length === 0) return response.status(400).send("Doctor Appointment Time is Required!!");

        doctor.appointmentTime = data.appointmentTime;
        await hospital.save();
        return response.status(200).send("Doctor Appointment Time UPDATED Successfully!!");

    } catch (err) {
        console.log(`Doctor Appointment Time UPDATING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor Appointment Time UPDATING ERROR!!");
    }
});
*/

export default router;