import { Router } from "express";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { HospitalFinder, PolyclinicFinder, DoctorFinder } from "../utils/middlewares.mjs";

const router = Router();

// Tüm Hastaneleri MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
// İl Filtrelemesi Yapılabilir         : "/admin/Hospital?city=Konya"
// İlçe Filtrelemesi Yapılabilir       : "/admin/Hospital?district=Akşehir"
// İl ve İlçe Filtrelemesi Yapılabilir : "/admin/Hospital?city=Konya&district=Akşehir"
router.get("/hospital", async (request, response) => {
    try {
        const cityName = request.query.city;
        const districtName = request.query.district;
        let filter = {};

        if(cityName) filter.city = cityName;
        if(districtName) filter.district = districtName;

        const hospitals = await Hospital.find(filter);
        if(!hospitals) return response.status(400).send("Hospital Not Found!!");
        
        return response.status(200).json(hospitals);

    } catch (err) {
        console.log(`Hospital LISTING ERROR \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastaneyi MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
router.get("/hospital/:hospitalID", async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        return response.status(200).json(hospital);
    
    } catch (err) {
        console.log(`Hospital LISTING ERROR \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki Poliklinikleri Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic", async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        return response.status(200).json(hospital.polyclinics);

    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Listeleme API'si.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID", async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        return response.status(200).json(polyclinic);

    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniktelk Doktorlar Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor", async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        return response.status(200).json(polyclinic.doctors);

    } catch (err) {
        console.log(`Doctor LISTING ERROR \n${err}`);
        return response.status(400).send("Doctor LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Poliklinikteki ID'si Belirtilen Doktoru Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID/doctor/:doctorID", async (request, response) => {
    try {
        const hospital = await HospitalFinder(request.params.hospitalID);
        const polyclinic = await PolyclinicFinder(hospital, request.params.polyclinicID);
        const doctor = await DoctorFinder(polyclinic, request.params.doctorID);
        return response.status(200).json(doctor);

    } catch (err) {
        console.log(`Doctor LISTING ERROR \n${err}`);
        return response.status(400).send("Doctor LISTING ERROR!!");
    }
});

export default router;