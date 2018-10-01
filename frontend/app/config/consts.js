angular.module('distPassApp').constant('consts', {
  appName: 'DistPass',
  version: '',
  owner: 'Luís Marques',
  year: '2018',
  apiUrl: 'http://localhost:3003/api',
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
