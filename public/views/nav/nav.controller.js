(function()
{
    angular
        .module("MobileTestManager")
        .controller("NavCtrl", NavCtrl);
    
    function NavCtrl($scope, UserService, CommandService, $location, $rootScope)
    {
        $scope.logout = logout;
        $scope.login = login;
        $scope.run_script = run_script;


        function login() {
            UserService
                .login()
                .then(
                    function(response){
                        $rootScope.allUsers = null;
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );

        }

        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        function run_script() {
            CommandService
                .run_script();
        }
    }
})();
