import passport from "passport";
import LocalStrategy from "passport-local";
import OAuth2Strategy from "passport-oauth2";
import { User } from "./repository/user-repository";
import encrypt from "./utils/encryption";
passport.use(
  new LocalStrategy({ usernameField: "userId" }, async function (
    username: string,
    password: string,
    done
  ) {
    const [[user, _], err] = await User.getWithUserId(username);
    // console.log(user, err);
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== encrypt(password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

const clientId = "b11e2ef0ed1a313772ad";
const clientSecret = "2cda7b2a0fb9de981c9923388e76b188cbcd55c3";
const baseUrl = "http://localhost:3000";
const redirectUrl = `${baseUrl}/api/github-login`;
const githubLoginuUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_url=${redirectUrl}`;

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: githubLoginuUrl,
      tokenURL: "https://github.com/login/oauth/access_token",
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:9000",
    },
    async function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
      // const [[user, _], err] = await User.getWithUserId(username);
      // // console.log(user, err);
      // if (err) {
      //   return done(err);
      // }
      // if (!user) {
      //   return done(null, false, { message: "Incorrect username." });
      // }
      // if (user.password !== encrypt(password)) {
      //   return done(null, false, { message: "Incorrect password." });
      // }
      // return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [[user, _], err] = await User.getWithId(id);
  done(err, user);
});

export default passport;
