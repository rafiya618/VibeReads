const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with the same email exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log("Existing user found. Logging in:", user.email);

          // If the Google ID is missing, update it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          // Create a new user if no user with the same email exists
          console.log("No existing user found. Creating a new user.");
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            isVerified: true, // Set based on your application logic
          });
        }

        // Pass the user object to the next middleware or callback
        return done(null, { ...user.toObject(), token: accessToken });
      } catch (err) {
        console.error("Google Login Error:", err);
        return done(err, null);
      }
    }
  )
);



passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);
