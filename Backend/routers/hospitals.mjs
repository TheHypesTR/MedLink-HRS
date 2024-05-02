import { Router } from "express";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";

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
        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).json(hospital);
    
    } catch (err) {
        console.log(`Hospital LISTING ERROR \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki Poliklinikleri Listeleyen API.
router.get("/hospital/:hospitalID/polyclinic", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).json(hospital.polyclinics);

    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki ID'si Belirtilen Polikliniği Listeleme API'si.
router.get("/hospital/:hospitalID/polyclinic/:polyclinicID", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");
        
        const polyclinicID = request.params.polyclinicID;
        const polyclinic = hospital.polyclinics.find(polyclinic => polyclinic._id == polyclinicID);
        if(!polyclinic) return response.status(400).send("Polyclinic Not Found!!");

        return response.status(200).json(polyclinic);

    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

export default router;