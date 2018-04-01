(function(){
    angular
        .module("MobileTestManager")
        .factory("CommandService", CommandService);

    function CommandService($http) {
        var api = {
            run_script: run_script
        };
        return api;

        function run_script(command) {
            return $http.post('/api/run-cmd', command);
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