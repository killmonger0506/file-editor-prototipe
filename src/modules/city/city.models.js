const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');

class City extends Model {}
City.init({
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
state_id: {
    type: DataTypes.INTEGER
}
}, {
  sequelize,
  modelName: "citie",
  tableName: 'cities',
  freezeTableName: false, // Model tableName will be the same as the model name,
   timestamps: false 
});


module.exports = City;