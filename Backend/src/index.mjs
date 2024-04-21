import express from "express";
import cookieParse from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import mongostore from "connect-mongo";
import { config } from "../config.mjs";

const app = express();
const PORT = config.PORT;

app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).send("Welcome Here!");
});

app.listen(PORT, () => { console.log(`Server has been started on this PORT ${PORT}!`); });