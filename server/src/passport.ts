import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "./repository/user-repository";
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
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [[user, _], err] = await User.getWithId(id);
  done(err, user);
});

export default passport;
