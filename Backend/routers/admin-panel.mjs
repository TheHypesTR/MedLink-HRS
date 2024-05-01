import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { Hospital } from "../mongoose/schemas/hospitals.mjs";
import { HospitalAddValidation, HospitalDeleteValidation } from "../utils/validation-schemas.mjs";

const router = Router();

// Tüm Hastaneleri MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
// İl Filtrelemesi Yapılabilir         : "/admin/Hospital?city=Konya"
// İlçe Filtrelemesi Yapılabilir       : "/admin/Hospital?district=Akşehir"
// İl ve İlçe Filtrelemesi Yapılabilir : "/admin/Hospital?city=Konya&district=Akşehir"
 router.get("/admin/hospital", async (request, response) => {
    try {
        const cityName = request.query.city;
        const districtName = request.query.district;
        let filter = {};

        if(cityName) filter.city = cityName;
        if(districtName) filter.district = districtName;

        let hospitals = await Hospital.find(filter);
        if(!hospitals) return response.status(400).send("Hospital Not Found!!");
        
        return response.status(200).json(hospitals);

    } catch (err) {
        console.log(`Hospital LISTING ERROR \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastaneyi MongoDB'den Çekip Kullanıcıya Görüntüleyen API.
router.get("/admin/hospital/:hospitalID", async (request, response) => {
    try {
        const hospital = request.params.hospitalID;
        if(!hospital) return response.status(400).send("HospitalID Required!!");

        const listHospital = await Hospital.findOne({ _id: hospital });
        if(!listHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send(listHospital);
    
    } catch (err) {
        console.log(`Hospital LISTING ERROR \n${err}`);
        return response.status(400).send("Hospital LISTING ERROR!!");
    }
});

// Hastane Ekleme API'si. Hastane Ekleme Sırasında Gelen Verileri Şema'dan Geçirip Karşılaştırma ve MongoDB'ye Ekleme yapıyor.
router.post("/admin/hospital/add", checkSchema(HospitalAddValidation), async (request, response) => {
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
router.put("/admin/hospital/:hospitalID/edit", async (request, response) => {
    try {
        const hospital = request.params.hospitalID;
        if(!hospital) return response.status(400).send("HospitalID Required!!");

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

        const editHospital = await Hospital.findOneAndUpdate({ _id: hospital }, { $set: data }, { new: true });
        if(!editHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital EDITED Successfully!!");

    } catch (err) {
        console.log(`Hospital EDITING ERROR \n${err}`);
        return response.status(400).send("Hospital EDITING ERROR!!");
    }
});

/* Hastane Bilgilerini Düzenleme API'si. Hastane Ekleme Sırasında Kullanılan Bilgilerin Tamamı Olmadan Düzenleme Yapılamaz.
router.put("/admin/hospital/:hospitalID/edit", checkSchema(HospitalAddValidation) ,async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        console.log(`Hospital EDITING... \n${data}`);

        const hospital = request.params.hospitalID;
        if(!hospital) return response.status(400).send("HospitalID Required!!!!");

        const editHospital = await Hospital.findByIdAndUpdate({ _id: hospital }, { $set: data }, { new: true });
        if(!editHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital EDITED Successfully!!");

    } catch (err) {
        console.log(`Hospital EDITING ERROR \n${err}`);
        return response.status(400).send("Hospital EDITING ERROR!!");
    }
});
*/

// Hastane Silme API'si. Hastane ID'si Adress Çubuğundan Çekilir ve MongoDB'de Karşılık Bulan Hastaneyi Siler.
router.delete("/admin/hospital/:hospitalID/delete", async (request, response) => {
    try {
        const hospital = request.params.hospitalID;
        if(!hospital) return response.status(400).send("HospitalID Required!!");

        const deleteHospital = await Hospital.findOneAndDelete({ _id: hospital });
        if(!deleteHospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send("Hospital DELETED Successfully!!");

    } catch (err) {
        console.log(`Hospital DELETING ERROR \n${err}`);
        return response.status(400).send("Hospital DELETING ERROR!!");
    }
});

/* Hastane Silme Ek API'si. Hastane Bilgilerine Göre Belirtilen Hastane'yi MongoDB'den Siler. Verileri Kontrol Amaçlı Şema'dan geçirir.
router.delete("/admin/hospital/delete", checkSchema(HospitalDeleteValidation), async (request, response) => {
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

/* Hastane Silme 2.Ek API'si. ID'ye Göre Belirtilen Hastaneye MongoDB'den Siler.
router.delete("/admin/hospital/delete", async (request, response) => {
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

// ID'si Belirtilen Hastanedeki Polyclinicleri Listeleyen API.
router.get("/admin/hospital/:hospitalID/polyclinic", async (request, response) => {
    try {
        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        return response.status(200).send(hospital.polyclinics);

    } catch (err) {
        console.log(`Polyclinic LISTING ERROR \n${err}`);
        return response.status(400).send("Polyclinic LISTING ERROR!!");
    }
});

// ID'si Belirtilen Hastaneye Poliklinic Ekleme API'si. Aynı Polyclinic'ten Varsa Ekleme Yapmaz.
router.post("/admin/hospital/:hospitalID/polyclinic/add", async (request, response) => {
    try {
        const polyclinicName = request.body.name;
        if(!polyclinicName) return response.status(400).send("Polyclinic Name is Required!!");

        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        const existingPolyclinic = hospital.polyclinics.find(polyclinic => polyclinic.name === polyclinicName);
        if (existingPolyclinic) return response.status(400).send("Polyclinic Already Exists!!");

        hospital.polyclinics.push({ name: polyclinicName });
        await hospital.save();

        return response.status(200).send("Polyclinic ADDED Succesfully!!");
    } catch (err) {
        console.log(`Polyclinic ADDING ERROR \n${err}`);
        return response.status(400).send("Polyclinic ADDING ERROR!!");
    }
});

// ID'si Belirtilen Hastanedeki Adı Girilen Polycliniği Silme API'si.
router.delete("/admin/hospital/:hospitalID/polyclinic/delete", async (request, response) => {
    try {
        const polyclinicName = request.body.name;
        if(!polyclinicName) return response.status(400).send("Polyclinic Name is Required!!");

        const hospitalID = request.params.hospitalID;
        const hospital = await Hospital.findOne({ _id: hospitalID });
        if(!hospital) return response.status(400).send("Hospital Not Found!!");

        const polyclinicsLength = hospital.polyclinics.length;
        const remainingPolyclinics = hospital.polyclinics.filter(polyclinic => polyclinic.name !== polyclinicName);
        hospital.polyclinics = remainingPolyclinics;
        await hospital.save();

        if(polyclinicsLength === remainingPolyclinics.length) return response.status(400).send("Polyclinic Not Found!!");
        return response.status(200).send("Polyclinic DELETED Succesfully!!");

    } catch (err) {
        console.log(`Polyclinic DELETING ERROR \n${err}`);
        return response.status(400).send("Polyclinic DELETING ERROR!!");
    }
});

export default router;