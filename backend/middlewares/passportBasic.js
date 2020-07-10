const passport = require("passport");
const passwordHash = require("password-hash");
const BasicStrategy = require("passport-http").BasicStrategy;
const users = require("../models/usersModel");

module.exports = passport.use(
  new BasicStrategy(async function (username, password, done) {
    let user;
    await users.getUserByName(username.trim(), {
      then: (rows) => {
        user = rows;
      },
      catch: (err) => {
        console.log("err: ", err);
        user = undefined;
      },
    });
    if (user == undefined) {
      console.log("HTTP Basic username not found");
      return done(null, false, { message: "HTTP Basic username not found" });
    }
    if (passwordHash.verify(password, user.password) !== true) {
      console.log("Wrong passsword");
      return done(null, false, { message: "Username or password is wrong" });
    }
    return done(null, user);
  })
);
