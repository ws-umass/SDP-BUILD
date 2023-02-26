import passport from "passport"
import passportLocal from "passport-local";
import Users from "./users";
import { Handler } from "express";

const { Strategy } = passportLocal;
const users = new Users();
users.init();

const strategy = new Strategy(
    async (username, password, done) => {
        if (!users.findUser(username)) {
            // no such user
            return done(null, false, { message: 'Wrong username' });
        }
        if (!users.validatePassword(username, password)) {
            // invalid password
            // should disable logins after N messages
            // delay return to rate-limit brute-force attacks
            await new Promise((r) => setTimeout(r, 2000)); // two second delay
            return done(null, false, { message: 'Wrong password' });
        }
        // success!
        return done(null, username);
    }
);

passport.use(strategy);
passport.serializeUser((user, done) => done(null, user));
// @ts-ignore
passport.deserializeUser((uid, done) => done(null, uid));

const auth = {
    configure: (app: { use: (arg: Handler) => void; }) => {
        app.use(passport.initialize());
        app.use(passport.session());
    },
    authenticate: (domain: string | passport.Strategy | string[], where: passport.AuthenticateCallback | ((...args: any[]) => any) | undefined) => {
        return passport.authenticate(domain, where);
    }
};

export default auth;
