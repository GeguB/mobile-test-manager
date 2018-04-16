(function () {
    angular
        .module("MobileTestManager")
        .controller("UserStepsCtrl", UserStepsCtrl);

    function UserStepsCtrl($scope, $location, $rootScope, StepService) {
        $scope.userSteps = userSteps;

        function userSteps(user_id) {
            StepService
                .findStepsByUserID(user_id)
                .then(
                    function (response) {
                        $scope.userSteps = response;
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();