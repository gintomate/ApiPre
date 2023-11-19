const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user");
const config = require("../config");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
    const customJwtStrategy = new JwtStrategy(params, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    });

    passport.use(customJwtStrategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", { session: false });
        }
    };
};
