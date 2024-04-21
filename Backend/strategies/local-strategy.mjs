import passport from "passport";
import { Strategy } from "passport-local";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { ComparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log(user);
    console.log(`Welcome Back! > ${user.name} <`);
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await LocalUser.findOne({ _id: id });
        if(!user) throw new Error("User Not Found!!");
        return done(null, user);
        
    } catch (err) {
        console.log(`Passport ERROR: \n${err}`);
        return done(err, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "TCno" }, async (TCno, password, done) => {
        try {
            const user = await LocalUser.findOne({ TCno: TCno });
            if(!user) throw new Error("User Not Found!!");

            if(!ComparePassword(password, user.password)) throw new Error("Bad Credentials!!");

            return done(null, user);

        } catch (err) {
            return done(err, null);
        }
    }
));