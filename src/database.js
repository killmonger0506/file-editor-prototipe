import Sequelize from 'sequelize'
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

    try {
      sequelize.sync({force: false});
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    /*const models = {
      country: sequelize.import('./modules/country/country.models'),
      state: sequelize.import('./modules/state/state.models')
    }

    Object.keys(models).forEach(model => {
      if('associate' in models[model]){
        models[model].associate(models)
      }
    })

    models.sequelize = sequelize;
    models.sequelize = Sequelize;*/


module.exports = sequelize
  