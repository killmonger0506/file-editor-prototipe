const Country  = require('../country/country.models'); // Uso del modelo para los usuarios


  const get_countries = (req, res, next) => {

    return Country.findAll({
        attributes: ['id', 'name']
    })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(error))


  }

module.exports = {
    get_countries
}