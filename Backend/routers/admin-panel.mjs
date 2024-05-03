import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { HospitalAddValidation } from "../utils/validation-schemas.mjs";
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
        if(!user) return response.status(400).send("User Not Found!!");

        if(user.role === "Admin") return response.status(400).send("This User Already Admin!!");

        user.role = "Admin";
        await user.save();
        return response.status(200).send("User Promote Successfully!!");

    } catch (err) {
        console.log(`User Promote ERROR \n${err}`);
        return response.status(400).send("User Promote ERROR!!");
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve MongoDB'ye Ekleme yapıyor.
router.post("/admin/hospital/add", UserLoginCheck, UserPermCheck, checkSchema(HospitalAddValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        console.log(`Hospital ADDING... \n${data}`);
        const hospital = await Hospital.findOne({ name: data.name, city: data.city, district: data.district });
        if(hospital) return response.status(400).send("Hospital Already Exists!!");

        const newHospital = new Hospital(data);
        const savedHospital = await newHospital.save();
        return response.status(201).send(`Hospital ADDED Successfully!!\r\n${savedHospital}`);

    } catch (err) {
        console.log(`Hospital ADDING ERROR \n${err}`);
        return response.status(400).send("Hospital ADDING ERROR!!");
    }
});

// Hastane Bilgilerini Düzenleme API'si. Sadece Hastaneye Ait Girilen Değerleri Günceller!
router.put("/admin/hospital/:hospitalID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const cityName = request.body.city;
        const districtName = request.body.district;
        const hospitalName = request.body.name;
        const hospitalAddress = request.body.address;
        let data = {};

        if(cityName) data.city = cityName;
        if(districtName) data.district = districtName;
        if(hospitalName) data.name = hospitalName;
        if(hospitalAddress) data.address = hospitalAddress;
        if(Object.keys(data).length === 0) return response.status(400).send("Editing Cannot be Made Without Entering any Data!!");

        const editHospital = await Hospital.findOneAndUpdate({ _id: hospitalID }, { $set: data }, { new: true });
        if(!editHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital EDITED Successfully!!");

    } catch (err) {
        console.log(`Hospital EDITING ERROR \n${err}`);
        return response.status(400).send("Hospital EDITING ERROR!!");
    }
});

// Hastane Silme API'si. Hastane ID'si Adress Çubuğundan Çekilir ve MongoDB'de Karşılık Bulan Hastaneyi Siler.
router.delete("/admin/hospital/:hospitalID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const deleteHospital = await Hospital.findOneAndDelete({ _id: hospitalID });
        if(!deleteHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital DELETED Successfully!!");

    } catch (err) {
        console.log(`Hospital DELETING ERROR \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
    }
});

// ID'si Belirtilen Hastaneye Poliklinik Ekleme API'si. Aynı Polyclinic'ten Varsa Ekleme Yapmaz.
router.post("/admin/hospital/:hospitalID/polyclinic/add", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);

        let data = {};
        if(request.body.name) data.name = request.body.name;
        if(Object.keys(data).length === 0) return response.status(400).send("Adding Cannot be Made Without Entering any Data!!");

        const existingPolyclinic = hospital.polyclinics.find(polyclinic => polyclinic.name === data.name);
        if (existingPolyclinic) return response.status(400).send("Polyclinic Already Exists!!");

        hospital.polyclinics.push({ name: data.name });
        await hospital.save();
        return response.status(200).send("Polyclinic ADDED Succesfully!!");

    } catch (err) {
        console.log(`Polyclinic ADDING ERROR \n${err}`);
        return response.status(400).send("Polyclinic ADDING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Düzenleme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/edit", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);

        let data = {};
        if(request.body.name) data.name = request.body.name;
        if(Object.keys(data).length === 0) return response.status(400).send("Polyclinic Name is Required!!");

        polyclinic.name = data.name;
        await hospital.save();
        return response.status(200).send("Polyclinic EDITED Successfully!!");

    } catch (err) {
        console.log(`Polyclinic EDITING ERROR \n${err}`);
        return response.status(400).send("Polyclinic EDITING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        
        const polyclinicsLength = hospital.polyclinics.length;
        const polyclinicID = request.params.polyclinicID;
        const remainingPolyclinics = hospital.polyclinics.filter(polyclinic => (polyclinic._id != polyclinicID));
        if(polyclinicsLength === remainingPolyclinics.length) return response.status(400).send("Polyclinic Not Found!!");

        hospital.polyclinics = remainingPolyclinics;
        await hospital.save();
        return response.status(200).send("Polyclinic DELETED Succesfully!!");

    } catch (err) {
        console.log(`Polyclinic DELETING ERROR \n${err}`);
        return response.status(400).send("Polyclinic DELETING ERROR!!");
    }
});

// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğine Doktor Ekleme API'si. Aynı Poliklinikteki Doktor İsimleri Aynı Olamaz.
router.post("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/add", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);

        let data = {};
        if(request.body.name) data.name = request.body.name;
        if(Object.keys(data).length === 0) return response.status(400).send("Doctor Name is Required!!");

        const existingDoctor = polyclinic.doctors.find(doctor => (doctor.name === data.name));
        if(existingDoctor) return response.status(400).send("Doctor Already Exists!!");

        polyclinic.doctors.push({ name: data.name });
        await hospital.save();
        return response.status(200).send("Doctor ADDED Successfully!!");

    } catch (err) {
        console.log(`Doctor ADDING ERROR \n${err}`);
        return response.status(400).send("Doctor ADDING ERROR!!");
    }
})

router.delete("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/delete", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);

        const doctorsLength = polyclinic.doctors.length;
        const doctorID = request.params.doctorID;
        const remainingdoctors = polyclinic.doctors.filter(doctor => (doctor._id != doctorID));
        if(doctorsLength === remainingdoctors.length) return response.status(400).send("Doctor Not Found!!");

        polyclinic.doctors = remainingdoctors;
        await hospital.save();
        return response.status(200).send("Doctor DELETED Successfully!!");

    } catch (err) {
        console.log(`Doctor DELETING ERROR \n${err}`);
        return response.status(400).send("Doctor DELETING ERROR!!");
    }
});

// --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK --- GÜNCELLENECEK ---
// ID'si Belirtilen Hastanenin ID'si Belirtilen Polikliniğindeki ID'si Belirtilen Doktorun İzin Raporunu Güncelleştirme API'si.
router.put("/admin/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID/setSickRep", UserLoginCheck, UserPermCheck, async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        const doctor = await DoctorFinder(polyclinic, request.params.doctorID);

        let data = {};
        if(typeof request.body.sickReport === "boolean") data.sickReport = request.body.sickReport;
        if(Object.keys(data).length === 0) return response.status(400).send("Doctor Sick Report Status (boolean) is Required!!");

        doctor.sickReport = data.sickReport;
        await hospital.save();
        return response.status(200).send("Doctor Sick Report UPDATED Successfully!!");
        
    } catch (err) {
        console.log(`Doctor Sick Report UPDATING ERROR!! \n${err}`);
        return response.status(400).send("Doctor Sick Report UPDATING ERROR!!");
    }
});

export default router;