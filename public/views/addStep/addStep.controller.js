(function () {
    angular
        .module("MobileTestManager")
        .controller("AddStepCtrl", AddStepCtrl);

    function AddStepCtrl($scope, $location, $rootScope, StepService) {
        $scope.newStep = newStep;

        function newStep(step, user_id) {
            step.createdBy = user_id;
            step.updatedOn = Date.now();
            StepService
                .createStep(step)
                .then(
                    function () {
                        $scope.message = "Step has been added."

                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();