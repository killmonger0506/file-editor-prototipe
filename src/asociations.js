/*const Post = require('./models/Post');
const Address = require('./models/Address');
const User = require('./models/User');*/

// Uno a uno

// Usuario tiene una direccion
// añadir una clave foranea userId a la tabla addresses
//User.hasOne(Address, { as: "domicilio", foreignKey: "residente_id" });

// Añade una clave userId a la tabla addresses
//Address.belongsTo(User, { as: "residente", foreignKey: "residente_id" });

// Uno a muchos, 1 a N
// Usuario va a tener muchos posts o publicaciones
// Se añade una clave userId a la tabla posts
//User.hasMany(Post, { as: "publicaciones", foreignKey: "autorId" });

// Se añade una clave userId a la tabla posts
//Post.belongsTo(User, { as: "autor" });



const Country = require('./modules/country/country.models');
const State = require('./modules/state/state.models');
const City = require('./modules/city/city.models');

Country.hasMany(State, {foreignKey: 'country_id'})
State.belongsTo(Country, {foreignKey: 'country_id'})
City.belongsTo(State, {foreignKey: 'state_id'})
