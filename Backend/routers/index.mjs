import { Router } from "express";
import usersRouter from "./users.mjs";
import adminPanelRouter from "./admin-panel.mjs";
import hospitalsRouter from "./hospitals.mjs";
import turkish from "../languages/turkish.mjs";

const router = Router();

router.use(usersRouter);
router.use(adminPanelRouter);
router.use(hospitalsRouter);

// Dil Değiştirme API'si
router.post("/setLanguage/:languageName", (request, response) => {
    const updatedLanguage = request.params.languageName;
    if (updatedLanguage === "english" || updatedLanguage === "turkish") {
        response.cookie("language", updatedLanguage, { maxAge: 1000 * 60 * 60 * 24 * 365, signed: true });

        if (updatedLanguage === "english") return response.status(200).send(`Language Settings Updated to ${updatedLanguage.toUpperCase()} Successfully!!`);
        return response.status(200).send(`Dil Seçeneğiniz ${updatedLanguage.toUpperCase()} Olarak Güncellendi!!`);
    }
    return response.status(400).send(turkish.invalidLang);
});

export default router;