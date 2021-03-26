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


app.use('/api', routes);

export default app;