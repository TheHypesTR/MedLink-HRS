import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import routers from "../routers/index.mjs";
import { logMiddleware } from "../utils/middlewares.mjs";
import config from "../config.mjs";

const app = express();
const PORT = config.PORT;

mongoose.connect(config.mongooseConnectionString).then(() => console.log("Connected to MongoDB!!")).catch((err) => console.log(`DB-ERROR: ${err}`));

app.use(express.json());
app.use(cookieParser("Pi7utbj8EI"));
app.use(session({
    secret: "UW6pw4uraD",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: mongoStore.create({
        client: mongoose.connection.getClient()
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logMiddleware);
app.use(routers);

app.listen(PORT, () => { console.log(`Server has been started on this Adress: http://localhost:${PORT}/`); });