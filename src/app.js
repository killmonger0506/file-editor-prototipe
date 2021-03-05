require('dotenv').config();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: `${process.env.NODE_APP_BASE_URL}/api/auth/linkedin/callback`,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  console.log(accessToken, refreshToken, profile, done);
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));

app.use('/api', routes);

export default app;