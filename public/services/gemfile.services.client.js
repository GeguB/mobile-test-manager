(function () {
    angular
        .module("MobileTestManager")
        .factory("GemfileService", GemfileService);

    function GemfileService($http) {
        var api = {
            addGemfile: addGemfile,
            findGemfilesByUserID: findGemfilesByUserID,
        };
        return api;

        function addGemfile(gemfile) {
            return $http.post('/api/add/gemfile', gemfile)
        }

        function findGemfilesByUserID(userID) {
            return $http.get('/api/gemfiles', {params: {userID: userID}})
        }
    }
})();