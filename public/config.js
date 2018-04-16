(function() {
    angular.module("MobileTestManager")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when('/login', {
                    templateUrl: 'views/login/login.view.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: 'views/profile/profile.view.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/register', {
                    templateUrl: 'views/register/register.view.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'model'
                })
                .when('/commands', {
                    templateUrl: 'views/user-commands/user-commands.view.html',
                    controller: 'UserCommandsCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/newGemfile', {
                    templateUrl: 'views/addGemfile/addGemfile.view.html',
                    controller: 'AddGemfileCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
                .when('/gemfiles', {
                    templateUrl: 'views/userGemfiles/userGemfiles.view.html',
                    controller: 'UserGemfilesCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/newStep', {
                    templateUrl: 'views/addStep/addStep.view.html',
                    controller: 'AddStepCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
                .when('/steps', {
                    templateUrl: 'views/listSteps/listSteps.view.html',
                    controller: 'UserStepsCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/newDevice', {
                    templateUrl: 'views/addDevice/addDevice.view.html',
                    controller: 'AddDeviceCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/listDevices', {
                    templateUrl: 'views/devicesList/devicesList.view.html',
                    controller: 'DevicesListCtrl'
                })
                .when('/run', {
                    templateUrl: 'views/runSpec/runSpec.view.html',
                    controller: 'RunSpecCtrl',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                redirectTo: '/home'
            });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
