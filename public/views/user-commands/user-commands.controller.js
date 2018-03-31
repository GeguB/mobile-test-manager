(function()
{
    angular
        .module("MobileTestManager")
        .controller("UserCommandsCtrl", UserCommandsCtrl);
    
    function UserCommandsCtrl($scope, UserService, CommandService, $location, $rootScope)
    {
        $scope.run_script = run_script;



        function run_script() {
            CommandService
                .run_script();
        }
    }
})();
