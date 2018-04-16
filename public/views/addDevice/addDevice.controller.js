(function () {
    angular
        .module("MobileTestManager")
        .controller("AddDeviceCtrl", AddDeviceCtrl);

    function AddDeviceCtrl($scope, $location, $rootScope, DeviceService) {
        $scope.addDevice = addDevice;

        function addDevice(device, user_id) {
            device.addedBy = user_id;
            device.updatedOn = Date.now();
            DeviceService
                .addDevice(device)
                .then(
                    function () {
                        $scope.message = "Device has been added."

                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();