import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// Sets up local strategy
passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const displayLogInForm = (req, res, next) => {
  res.render("loginForm", { title: "Please Log in" });
};

const logIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

export { displayLogInForm, logIn };
