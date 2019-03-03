const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('./keys');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientId: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {}
    )
  );
};
