const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)
  

  // rotas da API
  const distPassService = require('../api/distPass/distPassService')
  distPassService.register(router, '/distPass')

  const homeActiveWorksSerice = require('../api/homeActiveWorks/homeActiveWorksSerice')
  router.route('/homeActiveWorks').get(homeActiveWorksSerice.getSummary)

}
