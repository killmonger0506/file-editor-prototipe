const City       = require('../city/city.models'); // Uso del modelo para los usuarios


  const get_cities = (req, res, next) => {

    return City.findAll({
      attributes: ['name', 'id'],
      where: {state_id: req.params.id}
    })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(error))


  }

module.exports = {
    get_cities
}