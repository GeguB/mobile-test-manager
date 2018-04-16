(function () {
    angular
        .module("MobileTestManager")
        .factory("DeviceService", DeviceService);

    function DeviceService($http) {
        var api = {
            addDevice: addDevice,
            getAllDevices: getAllDevices,
        };
        return api;

        function addDevice(device) {
            return $http.post('/api/add/device', device)
        }

        function getAllDevices() {
            return $http.get('/api/devices')
        }
    }
})();