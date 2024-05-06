import { Router } from "express";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { Polyclinic } from "../mongoose/schemas/polyclinics.mjs";
import { Doctor } from "../mongoose/schemas/doctors.mjs";
import { HospitalFinder, PolyclinicFinder, DoctorFinder } from "../utils/middlewares.mjs";

const router = Router();

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
        if(!hospitals) return response.status(400).send("Hospital Not Found!!");
        if(hospitals.length === 0) return response.status(400).send("Check Hospital Filters!!");
        return response.status(200).json(hospitals);

    } catch (err) {
        console.log(`Hospitals LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Hospitals LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastaneyi MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
router.get("/hospital/:hospitalID", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await HospitalFinder(hospitalID);
        return response.status(200).json(hospital);
    
    } catch (err) {
        console.log(`Hospital LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki Poliklinikleri Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        await HospitalFinder(hospitalID);

        const polyclinics = await Polyclinic.find({ hospitalID: hospitalID });
        if(!polyclinics) return response.status(404).send("Polyclinics Not Found!!");
        return response.status(200).json(polyclinics);
        
    } catch (err) {
        console.log(`Polyclinics LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Polyclinics LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID", async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        const polyclinic = await PolyclinicFinder(hospitalID, polyclinicID);
        return response.status(200).json(polyclinic);
        
    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki Doktorları Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor", async (request, response) => {
    try {
        const { hospitalID, polyclinicID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);

        const doctors = await Doctor.find({ polyclinicID: polyclinicID });
        if(!doctors) return response.status(404).send("Doctors Not Found!!");
        return response.status(200).json(doctors);
        
    } catch (err) {
        console.log(`Doctor LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktoru Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID", async (request, response) => {
    try {
        const { hospitalID, polyclinicID, doctorID } = request.params;
        await PolyclinicFinder(hospitalID, polyclinicID);
        const doctor = await DoctorFinder(polyclinicID, doctorID);
        return response.status(200).json(doctor);
        
    } catch (err) {
        console.log(`Doctor LISTING ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Doctor LISTING ERROR!!");
    }
});

export default router;