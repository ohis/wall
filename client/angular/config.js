var app = angular.module('app',['ngRoute','ngCookies']);

app.config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl:'partials/new.html',
        controller:'UsersController as UC'
      })
      .when('/dashboard',{
        templateUrl:'partials/dashboard.html',
        controller: 'UsersController as UC'
      })
      .otherwise({redirecTo:'/'})
})
