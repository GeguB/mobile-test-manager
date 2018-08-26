(function () {
    angular
        .module("MobileTestManager")
        .controller("RunSpecCtrl", RunSpecCtrl);

    function RunSpecCtrl($scope, $location, $rootScope, GemfileService, DeviceService, StepService, CommandService) {
        $scope.userGemfiles = userGemfiles;
        $scope.devicesList = devicesList;
        $scope.userSteps = userSteps;
        $scope.runTest = runTest;
        $scope.run_test = run_test;
        $scope.runName = "default";
        $scope.selectedSteps = selectedSteps;
        $scope.addTestStepToSelected = addTestStepToSelected;
        $scope.deleteStepFromSelected = deleteStepFromSelected;
        $scope.moveStepUp = moveStepUp;
        $scope.moveStepDown = moveStepDown;

        let selectedStepsArray = [];


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

        function runTest() {
            console.log($scope.selectedGemfile);
            console.log($scope.selectedDevice);
            console.log($scope.selectedStep)
        }


        function run_test(user_id) {
            let json = `{
                            "user_id":"${user_id}",
                            "test_run_name":"${$scope.runName}",
                            "gemfile_id":"${$scope.selectedGemfile['_id']}",
                            "gemfile_content":"${escape($scope.selectedGemfile['content'])}",
                            "step_content":"${escape($scope.selectedStep['content'])}",
                            "device_id":"${$scope.selectedDevice['_id']}",
                            "device_port":"${$scope.selectedDevice['appiumPort']}",
                            "deviceName":"${$scope.selectedDevice['name']}",
                            "udid": "${$scope.selectedDevice['udid']}"
                            
                        }`;
            console.log(json);
            CommandService
                .run_test(json)
        }

        function addTestStepToSelected(step) {
            selectedStepsArray.push(step);
            $scope.selectedSteps = selectedStepsArray;
        }

        function deleteStepFromSelected(step) {
            const index = selectedStepsArray.indexOf(step);

            if (index !== -1) {
                selectedStepsArray.splice(index, 1);
            }
        }

        function moveStepUp(step) {
            const index = selectedStepsArray.indexOf(step);

            if (index > 0)
            {
                let tempElement = selectedStepsArray[index-1];
                selectedStepsArray[index-1] = step;
                selectedStepsArray[index] = tempElement;
            }
        }

        function moveStepDown(step) {
            const index = selectedStepsArray.indexOf(step);

            if (index < selectedStepsArray.length-1)
            {
                let tempElement = selectedStepsArray[index+1];
                selectedStepsArray[index+1] = step;
                selectedStepsArray[index] = tempElement;
            }
        }

        function selectedSteps() {
            console.log("Called SS");
            $scope.selectedSteps = selectedStepsArray;
        }
    }
})();