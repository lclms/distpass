const _ = require('lodash')
const DistPass = require('../distPass/distPass')

// Mais uma função middleware
function getSummary(req, res) {
  DistPass.find({
    status: "Ready"
  }, function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result))
    }
  })
}

module.exports = { getSummary }