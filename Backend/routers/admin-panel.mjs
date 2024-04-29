import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { HospitalValidation } from "../utils/validation-schemas.mjs";

const router = Router();

// Tüm Hastaneleri Görüntüleyen API.
router.get("/admin/Hospital", async (request, response) => {
    try {
        const hospitals = await Hospital.find();
        return response.status(200).send(hospitals);
        
    } catch (err) {
        console.log(`Hospital Getting ERROR \n${err}`);
        return response.status(400).send(`Hospital Getting ERROR \n${err}`);
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve Eklemeyi yapıyor.
router.post("/admin/addHospital/", checkSchema(HospitalValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        console.log(data);
        const hospital = await Hospital.findOne({ name: data.name, city: data.city, district: data.district });
        if(hospital) return response.status(400).send("Hospital Already Exists!!");

        const newHospital = new Hospital(data);
        const savedHospital = await newHospital.save();
        return response.status(201).send(`Hospital Added Successfully!!\r\n${savedHospital}`);

    } catch (err) {
        console.log(`Hospital Adding ERROR \n${err}`);
        return response.status(400).send("Hospital Adding ERROR!!");
    }
});

export default router;