const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');


class Editor extends Model {}
Editor.init({
    id: { // Identificador del usuario
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    data_info: {
      type: DataTypes.JSON,
    },
    data_img: {
      type: DataTypes.JSON,
    }
}, {
    sequelize,
    modelName: "editor",
    tableName: 'editors',
    freezeTableName: false, // Model tableName will be the same as the model name,
     timestamps: true 
});



module.exports = Editor;