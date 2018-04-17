(function()
{
    angular
        .module("MobileTestManager")
        .controller("UserCommandsCtrl", UserCommandsCtrl);
    
    function UserCommandsCtrl($scope, UserService, CommandService, $location, $rootScope)
    {
        $scope.run_script = run_script;
        $scope.run_test = run_test;



        function run_script(command) {
            command.executionDate = Date.now();
            CommandService
                .run_script(command)
                .then(
                    function (res) {
                        var command = res.data;
                        $scope.message = "Command was run."
                    }
                );
        }

        function run_test(user_id) {
            let json = `{"user_id":"${user_id}"}`;
            console.log(json)
            CommandService
                .run_test(json)
        }
    }
})();
