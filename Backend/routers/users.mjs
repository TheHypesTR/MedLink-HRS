import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import passport from "passport";
import crypto from "crypto";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { Token } from "../mongoose/schemas/tokens.mjs";
import { UserValidation, PasswordValidation } from "../utils/validation-schemas.mjs";
import { HashPassword } from "../utils/helpers.mjs";
import { sendEmail } from "../utils/email-sender.mjs";
import { UserLoginCheck, UserAlreadyLogged } from "../utils/middlewares.mjs";
import config from "../config.mjs";
import "../strategies/local-strategy.mjs";

const router = Router();

// Aktif Kullanıcı Varsa Kullanıcı Bilgilerini Gösterir Yoksa Hata Verir.
router.get("/auth", UserLoginCheck, (request, response) => {
    console.log(request.session.passport?.user);
    console.log(request.user);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

// Local Kullanıcı Kaydının Yapılır.
router.post("/auth/register", UserAlreadyLogged, checkSchema(UserValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const data = matchedData(request);
        data.password = HashPassword(data.password);
        data.email = data.email.toLowerCase();
        const tcnum = data.TCno.toString();
        let toplam = 0;
        for (let i = 0; i < 10; i++) 
            toplam += parseInt(tcnum[i]);
        if (toplam % 10 !== parseInt(tcnum[10]) || parseInt(tcnum[10]) % 2 !== 0) return response.status(400).send("Invalid 'T.C. NO'!!");
        
        const user = await LocalUser.findOne({ TCno: data.TCno });
        if(user) return response.status(400).send("User Already Exists!!");

        const newUser = new LocalUser(data);
        const savedUser = await newUser.save();
        return response.status(201).send(`New User Created!! \n${savedUser}`);
        
    } catch (err) {
        console.log(`User REGISTRATION ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("User REGISTRATION ERROR!!");
    }
});

// Local Kullanıcı Girişinin Yapılır.
router.post("/auth/login", UserAlreadyLogged, passport.authenticate("local"), (request, response) => {
    return response.status(200).send("User LOGIN Successfully!!");
});

// Aktif bir Kullanıcı Varsa Oturumunu Kapatmasını Sağlar.
router.post("/auth/logout", UserLoginCheck, (request, response) => {
    if(!request.user) return response.sendStatus(401);

    request.logOut((err) => {
        if (err) return response.sendStatus(400);
        
        response.clearCookie("connect.sid");
        return response.status(200).send("User LOGOUT Successfully!!");
    });
});

// Kullanıcının Şifresini Sıfırlayabilmesi için Token Oluşturulur ve Sıfırlama Bağlantısı Kullanıcının "E-Mail" Adresine Gönderilir.
router.post("/auth/reset-password", async (request, response) => {
    try {
        const userEMail = (request.body.email).toLowerCase();
        const user = await LocalUser.findOne({ email: userEMail });
        if(!user) return response.sendStatus(400);

        const token = await new Token({
            tokenID: crypto.randomBytes(32).toString("hex"),
            userID: user._id,
            userEMail: user.email,
        }).save();

        const message = `Hi ${user.name},\nClick to Reset your Password!!\nhttp://localhost:${config.PORT}/auth/user/reset-password/${user._id}/${token.tokenID}`;
        await sendEmail(user.email, "Password Reset", message);
        return response.status(201).send(`Password-Reset E-Mail Sent to '${user.email}' !!`)

    } catch (err) {
        console.log(`Password Reset ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Password Reset ERROR!!");
    }
});

// Şifre Sıfırlama Bağlantısına Tıklayan Kullanıcı Şifresini Şemadaki Kurallara Uygun Olarak Değiştirebilir.
router.post("/auth/user/reset-password/:id/:token", checkSchema(PasswordValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        
        const newPassword = HashPassword(request.body.password);
        const user = await LocalUser.findOne({ _id: request.params.id });
        if(!user) return response.status(400).send("User Not Found!!");

        const token = await Token.findOne({ tokenID: request.params.token, userID: user._id });
        if(!token) return response.status(400).send("Token Not Found!!");

        await LocalUser.updateOne({ _id: user._id }, { $set: { password: newPassword } }, { new: true });
        await Token.findOneAndDelete({ userID: user._id });

        const message = `Hi ${user.name},\nYour Password has been Successfully Updated!!`;
        await sendEmail(user.email, "Password-Reset Successfully!", message);
        return response.status(200).send("Password Reset Successfully!!");

    } catch (err) {
        console.log(`Password Reset ERROR \nUserID: ${request.session.passport?.user} \nDate: ${new Date(Date.now())} \n${err}`);
        return response.status(400).send("Password Reset ERROR!!");
    }
});

export default router;