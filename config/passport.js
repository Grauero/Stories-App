const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('./keys');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        let image = profile.photos[0].value;
        image = image.substring(0, image.indexOf('?')); // remove default size of profile image

        let newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image
        };

        // check for existng user
        const existingUser = await User.findOne({ googleID: profile.id });
        if (existingUser) {
          // return user
          done(null, existingUser);
        } else {
          // create user
          newUser = await new User(newUser).save();
          done(null, newUser);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
