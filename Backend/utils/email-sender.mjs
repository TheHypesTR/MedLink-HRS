import nodemailer from "nodemailer";
import config from "../config.mjs";

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.emailSenderHost,
            port: config.emailSenderPORT,
            secure: true,
            auth: {
                user: config.emailSenderUser,
                pass: config.emailSenderPass,
            },
        });

        await transporter.sendMail({
            from: config.emailSenderUser,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("E-Mail Sent, Succesfully!!");
        
    } catch (err) {
        console.log(`E-Mail NOT Sent!! \n${err}`);
    }
};