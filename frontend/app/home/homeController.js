(function() {
angular.module('distPassApp').controller('HomeCtrl', [
  '$http',
  'consts',
  'SocketIOService',
  HomeController
])

function HomeController($http, consts, SocketIOService) {

    const vm = this
    const url = 'http://localhost:3003/api/homeActiveWorks'

    vm.refresh = function()
    {
      $http.get(url).then(function(resp){
        vm.distPasss = resp.data
        vm.distPass = {}

      })
    }
    vm.showSummaryWork = function(activeWorks) {

      console.log('entrou')
      vm.activeWorksSummary = activeWorks
      
    }
    vm.StartSocket = function(s){

      if(s)
      SocketIOService.runSocket()
      else
      SocketIOService.stopSocket()

    }

    vm.refresh()
  }

})()
