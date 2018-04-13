(function () {
    angular
        .module("MobileTestManager")
        .factory("GemfileService", GemfileService);

    function GemfileService($http) {
        var api = {
            addGemfile: addGemfile,
        };
        return api;

        function addGemfile(gemfile) {
            return $http.post('/api/add/gemfile', gemfile)
        }
    }
})();