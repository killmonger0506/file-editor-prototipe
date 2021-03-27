const State  = require('../state/state.models'); // Uso del modelo para los usuarios


  const get_states = (req, res, next) => {

    return State.findAll({
      attributes: ['name', 'id'],
      where: {country_id: req.params.id}
    })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(error))


  }

module.exports = {
    get_states
}