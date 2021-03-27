const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');
const State  = require('../state/state.models');


class Country extends Model {}
Country.init({
    id: { // Identificador del usuario
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    code: {
      type: DataTypes.STRING,
      field: 'code'
    },
    phonecode: {
        type: DataTypes.STRING,
        //field: 'phone_code'
    }
}, {
    sequelize,
    modelName: "country",
    tableName: 'countries',
    freezeTableName: false, // Model tableName will be the same as the model name,
     timestamps: false 
});



module.exports = Country;