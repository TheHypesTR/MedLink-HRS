import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import passport from "passport";
import crypto from "crypto";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Token } from "../mongoose/schemas/tokens.mjs";
import { UserValidation, PasswordValidation } from "../utils/validation-schemas.mjs";
import { HashPassword } from "../utils/helpers.mjs";
import { sendEmail } from "../utils/email-sender.mjs";
import { UserLoginCheck, UserAlreadyLogged, LoadLanguage } from "../utils/middlewares.mjs";
import "../strategies/local-strategy.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

const router = Router();

// Aktif Kullanıcı Varsa Kullanıcı Bilgilerini Gösterir Yoksa Hata Verir.
router.get("/auth", UserLoginCheck, (request, response) => {
    console.log(request.session.passport?.user);
    console.log(request.user);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

// Local Kullanıcı Kaydının Yapılır.
router.post("/auth/register", UserAlreadyLogged, async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const userSchema = UserValidation(language);
        await checkSchema(userSchema).run(request);
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ ERROR: errors.array() });
    
        const data = matchedData(request);
        data.password = HashPassword(data.password);
        data.email = data.email.toLowerCase();
        const tcnum = data.TCno.toString();
        let toplam = 0;
        for (let i = 0; i < 10; i++) 
            toplam += parseInt(tcnum[i]);
        if (toplam % 10 !== parseInt(tcnum[10]) || parseInt(tcnum[10]) % 2 !== 0) return response.status(400).json({ ERROR: language.invalidTC });
        
        let user = await LocalUser.findOne({ TCno: data.TCno });
        if(!user) user = await LocalUser.findOne({ email: data.email });
        if(user) return response.status(400).json({ ERROR: language.userAlreadyExists });

        const newUser = new LocalUser(data);
        await newUser.save();
        return response.status(201).json({ STATUS: language.userRegistered});

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.userNotRegistered, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Local Kullanıcı Girişinin Yapılır.
router.post("/auth/login", UserAlreadyLogged, (request, response, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) return response.status(400).json({ ERROR: err.ERROR });
        if (!user) return response.status(400).json({ ERROR: err.ERROR });

        request.logIn(user, (err) => {
            if (err) return response.status(400).json({ ERROR: err.ERROR });

            const language = LoadLanguage(request);
            return response.status(200).json({ STATUS: language.userLoggedIn });
        });
    }) (request, response, next);
});


// Aktif bir Kullanıcı Varsa Oturumunu Kapatmasını Sağlar.
router.post("/auth/logout", UserLoginCheck, (request, response) => {
    const language = LoadLanguage(request);
    if(!request.user) return response.sendStatus(401);

    request.logOut((err) => {
        if (err) return response.status(400).json({ ERROR: err.message });
        response.clearCookie("connect.sid");
        return response.status(200).json({ STATUS: language.userLoggedOut });
    });
});

// Kullanıcının Şifresini Sıfırlayabilmesi için Token Oluşturulur ve Sıfırlama Bağlantısı Kullanıcının "E-Mail" Adresine Gönderilir.
router.post("/auth/reset-password", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const userEMail = (request.body.email).toLowerCase();
        const user = await LocalUser.findOne({ email: userEMail });
        if(!user) return response.status(400).json({ ERROR: language.userNotFound });

        const token = await new Token({
            tokenID: crypto.randomBytes(32).toString("hex"),
            tokenType: "Password Reset",
            userID: user._id,
            userEMail: user.email,
        }).save();

        const message = (language.hello.replace("${user}", user?.name) + language.clickResetPass + `\nhttp://localhost:5173/auth/user/reset-password/${user._id}/${token.tokenID}`);
        await sendEmail(user.email, language.resetPass, message);
        return response.status(201).json({ STATUS: language.emailSent.replace("${email}", user.email) });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.passNotReset, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

// Şifre Sıfırlama Bağlantısına Tıklayan Kullanıcı Şifresini Şemadaki Kurallara Uygun Olarak Değiştirebilir.
router.post("/auth/user/reset-password/:id/:token", async (request, response) => {
    const language = LoadLanguage(request);
    try {
        const passSchema = PasswordValidation(language);
        await checkSchema(passSchema).run(request);
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ ERROR: errors.array() });
        
        const newPassword = HashPassword(request.body.password);
        const user = await LocalUser.findOne({ _id: request.params.id });
        if(!user) return response.status(400).json({ ERROR: language.userNotFound });

        const token = await Token.findOne({ tokenID: request.params.token, userID: user._id });
        if(!token) return response.status(400).json({ ERROR: language.tokenNotFound });

        await LocalUser.updateOne({ _id: user._id }, { $set: { password: newPassword } }, { new: true });
        await Token.findOneAndDelete({ userID: user._id });

        const message = (language.hello.replace("${user}", user?.name) + language.passResetSucces);
        await sendEmail(user.email, language.resetPassSubject, message);
        return response.status(200).json({ STATUS: language.resetPassSubject });

    } catch (err) {
        const ERROR = { ERROR: err.message, UserID: request.session.passport?.user, Date: new Date(Date.now() + 1000 * 60 * 60 * 3) };
        console.log(language.passNotReset, ERROR);
        return response.status(400).json({ ERROR: err.message });
    }
});

export default router;