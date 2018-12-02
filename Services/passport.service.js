//external imports
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jwt-simple");

//utils
const { getDbConnection } = require("../Utils/dbConnections");
const { handleError } = require("../Utils/utilMethods");

//config
const keys = require("../Config/keys");
const constants = require("../Config/constants");


//internal imports
const fs = require("fs");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: keys.jwtSecretCode
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    let client = getDbConnection();
    try {
        let result = await client.query(constants.query.auth_query, [payload.sub]);
        if (result.rows.length == 0) {
        	fs.appendFileSync('log.txt', `auth jwt login-w-unauthorized-${new Date()}\n`);
            return done(null, false);
        } else {
        	fs.appendFileSync('log.txt', `auth jwt login-i-authorized-${new Date()}\n`);
        	return done(null,result.rows[0])
        }
    } catch (error) {
        fs.appendFileSync('log.txt', `auth jwt login-e-${error.toString()}-${new Date()}\n`);
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
});

passport.use("userLogin", jwtLogin);


exports.checkToken = passport.authenticate("userLogin", { session: false });


exports.generateToken = user_id => {
    return jwt.encode({ sub: user_id }, keys.jwtSecretCode);
};