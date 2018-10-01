angular.module('distPassApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: "/home",
      templateUrl: "home/home.html"
    }).state('works', {
      url: "/works",
      templateUrl: "works/tabs.html"
    }).state('about', {
      url: "/about",
      templateUrl: "about/about.html"
    }).state('backOffice', {
      url: "/backOffice",
      templateUrl: "backOffice/backOffice.html"
    }).state('login', {
      url: "/login",
      templateUrl: "login/login.html"
    }).state('accounts', {
      url: "/accounts",
      templateUrl: "login/accounts.html"
    }).state('adduser', {
      url: "/adduser",
      templateUrl: "login/adduser.html"
    })
    

    $urlRouterProvider.otherwise('/home')
}])
