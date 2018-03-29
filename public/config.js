(function() {
    angular.module("MobileTestManager")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .otherwise({
                redirectTo: '/home'
            });
        });

})();
