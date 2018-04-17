(function(){
    angular
        .module("MobileTestManager")
        .factory("CommandService", CommandService);

    function CommandService($http) {
        var api = {
            run_script: run_script,
            run_test: run_test
        };
        return api;

        function run_script(command) {
            return $http.post('/api/run-cmd', command);
        }

        function run_test(json) {
            return $http.post('/api/run-test', json);
        }

        function authorized(req, res, next) {
            if (!req.isAuthenticated()) {
                res.send(401);
            } else {
                next();
            }
        };
}
})();