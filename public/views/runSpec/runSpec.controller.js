(function () {
    angular
        .module("MobileTestManager")
        .controller("RunSpecCtrl", RunSpecCtrl);

    function RunSpecCtrl($scope, $location, $rootScope, GemfileService, DeviceService, StepService) {
        $scope.userGemfiles = userGemfiles;
        $scope.devicesList = devicesList;
        $scope.userSteps = userSteps;

        function userGemfiles(user_id) {
            GemfileService
                .findGemfilesByUserID(user_id)
                .then(
                    function (response) {
                        $scope.userGemfiles = response.data;
                        $scope.selectedGemfile = $scope.userGemfiles[0]
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }

        function devicesList() {
            DeviceService
                .getAllDevices()
                .then(
                    function (response) {
                        $scope.devicesList = response.data;
                        $scope.selectedDevice = $scope.devicesList[0]
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }

        function userSteps(user_id) {
            StepService
                .findStepsByUserID(user_id)
                .then(
                    function (response) {
                        $scope.userSteps = response.data;
                        $scope.selectedStep = $scope.userSteps[0]
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();