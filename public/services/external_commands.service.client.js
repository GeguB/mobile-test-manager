(function(){
    angular
        .module("MobileTestManager")
        .factory("ExtCmdService", ExtCmdService);

    function ExtCmdService($http) {
        var api = {
            run_script: run_script
        };
        return api;

        function run_script() {
            return $http.get('/api/run-cmd');
        }

}
})();