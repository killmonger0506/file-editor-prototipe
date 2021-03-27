//require('dotenv').config();

import express from 'express';
import bodyParser from'body-parser';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import fileupload from"express-fileupload";
//...



const app = express();
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cors());
app.use(fileupload());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }, app));

//app.use(express.json({ limit: '50mb' }));
//app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }, app));




app.use('/api', routes);

export default app;