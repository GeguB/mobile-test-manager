(function () {
    angular
        .module("MobileTestManager")
        .controller("DevicesListCtrl", DevicesListCtrl);

    function DevicesListCtrl($scope, $location, $rootScope, DeviceService) {
        $scope.devicesList = devicesList;

        function devicesList() {
            DeviceService
                .getAllDevices()
                .then(
                    function (response) {
                        $scope.devicesList = response;
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();