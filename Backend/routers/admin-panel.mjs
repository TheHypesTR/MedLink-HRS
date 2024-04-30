import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { HospitalAddValidation, HospitalDeleteValidation } from "../utils/validation-schemas.mjs";

const router = Router();

// Tüm Hastaneleri MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
// İl Filtrelemesi Yapılabilir  : "/admin/Hospital?city=Konya"
// İl ve İlçe Filtrelemesi de Yapılabilir: "/admin/Hospital?city=Konya&district=Akşehir"
 router.get("/admin/hospital", async (request, response) => {
    try {
        const cityName = request.query.city;
        const districtName = request.query.district;
        let filter = {};

        if(cityName) filter.city = cityName;
        if(districtName) filter.district = districtName;

        let hospitals = (cityName ? await Hospital.find(filter) : await Hospital.find());
        return response.status(200).json(hospitals);

    } catch (err) {
        console.log(`City LISTING ERROR \n${err}`);
        return response.status(400).send("City LISTING ERROR!!");
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve MongoDB'ye Ekleme yapıyor.
router.post("/admin/addHospital/", checkSchema(HospitalAddValidation), async (request, response) => {
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

// Hastane Silme API'si. Hastane ID'si Adress Çubuğundan Çekilir ve MongoDB'de Karşılık Bulan Hastaneyi Siler.
router.delete("/admin/:hospitalID/delete", async (request, response) => {
    try {
        const hospital = request.params.hospitalID;
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        const deleteHospital = await Hospital.findOneAndDelete({ _id: hospital });
        if(!deleteHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital DELETED Successfully!!");

    } catch (err) {
        console.log(`Hospital DELETING ERROR \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
    }
});

/* Hastane Silme Ek API'si. Hastane Bilgilerine Göre Belirtilen Hastane'yi MongoDB'den Siler. Verileri Kontrol Amaçlı Şema'dan geçirir.
router.delete("/admin/deleteHospital", checkSchema(HospitalDeleteValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        console.log(`Hospital DELETING... \n${data}`);
        const deleteHospital = await Hospital.findOneAndDelete(data);
        if(!deleteHospital) return response.status(400).send("Hospital Not Found!!");
        
        return response.status(200).send("Hospital DELETED Successfully!!");

    } catch (err) {
        console.log(`Hospital DELETING ERROR \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
    }
});
*/

/* Hastane Silme Ek API'si. ID'ye Göre Belirtilen Hastaneye MongoDB'den Siler.
router.delete("/admin/deleteHospital", async (request, response) => {
    try {
        const hospital = request.body.id;
        if(!hospital) return response.sendStatus(400);

        const deleteHospital = await Hospital.findOneAndDelete({ _id: hospital });
        if(!deleteHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital DELETED Successfully!!");

    } catch (err) {
        console.log(`Hospital DELETING ERROR \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
    }
});
*/

export default router;