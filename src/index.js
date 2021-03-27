require('dotenv').config();

const fs = require('fs');
const path = require('path');

// load required configuration settings from the file /.env
let env = path.resolve(__dirname, '../.env');
if (!fs.existsSync(env)) {
    console.log("--------------------------------------------");
    console.log(`App ${colors.red('ERR!')}: Missing .env file`);
    console.log("--------------------------------------------");
    process.exit(1);
}
// load and parse /.env file
/*const dotenv = require('dotenv');
const myEnv = dotenv.config()
const variableExpansion = require('dotenv-expand')
variableExpansion(myEnv)*/


import app from './app';
import {sequelize} from './database';



require('./asociations');

app.set('port', 5000);

app.listen(app.get('port'), () => {
  console.log('SERVER ON PORT ', app.get('port'));

  sequelize
});
