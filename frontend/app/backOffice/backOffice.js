(function() {
angular.module('distPassApp').controller('backOfficeCtrl', [
    '$http',
    'consts',
    backOfficeController
  ])
  function backOfficeController($http, consts) {
    const vm = this
    const url = 'http://localhost:3003/api/distPass'

    vm.refresh = function()
    {
      $http.get(url).then(function(resp){
        vm.distPasss = resp.data
        vm.distPass = {}

      })
    }
   

    vm.refresh()
  }

})()