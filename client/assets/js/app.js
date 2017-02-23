var rogueone = angular.module('rogueone',['ngRoute','angularUtils.directives.dirPagination','ngTouch', 'ui.grid','ui.grid.exporter']);

rogueone.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'client/templates/login.html',
        controller: 'loginctrl'
      }).when('/editview', {
        templateUrl: 'client/templates/page2.html',
        controller: 'detailctrl'
      }).when('/AddNew', {
        templateUrl: 'client/templates/page2.html',
        controller: 'detailctrl'
      }).when('/detail', {
        templateUrl: 'client/templates/page2.html',
        controller: 'detailctrl'
      })
       .when('/dash', {
       templateUrl: 'client/templates/home.html',
        controller: 'homectrl'
      })
        .otherwise({
        redirectTo: '/'
      });
    
       
}]);


rogueone.run(function ($rootScope, $location) {
     $rootScope.getSession = function () {
     }
    
});