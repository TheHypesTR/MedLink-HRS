import passport from "passport";
import { Strategy } from "passport-local";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { ComparePassword } from "../utils/helpers.mjs";
import { LoadLanguage } from "../utils/middlewares.mjs";
import turkish from "../languages/turkish.mjs";
import english from "../languages/english.mjs";

let language;
passport.serializeUser((user, done) => {
    console.log(language.welcome.replace("${name}", user.name));
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await LocalUser.findOne({ _id: id });
        if(!user) throw new Error(language.userNotFound);
        return done(null, user);
        
    } catch (err) {
        console.log(`Passport ERROR: \n${err}`);
        return done({ ERROR: err.message }, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "TCno", passReqToCallback: true }, async (request, TCno, password, done) => {
        language = LoadLanguage(request);
        try {
            const user = await LocalUser.findOne({ TCno: TCno });
            if(!user) throw new Error(language.userNotFound);
            if(!ComparePassword(password, user.password)) throw new Error(language.badCredentials);

            return done(null, user);

        } catch (err) {
            return done({ ERROR: err.message }, null);
        }
    }
));