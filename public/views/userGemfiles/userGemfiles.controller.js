(function () {
    angular
        .module("MobileTestManager")
        .controller("UserGemfilesCtrl", UserGemfilesCtrl);

    function UserGemfilesCtrl($scope, $location, $rootScope, GemfileService) {
        $scope.userGemfiles = userGemfiles;

        function userGemfiles(user_id) {
            GemfileService
                .findGemfilesByUserID(user_id)
                .then(
                    function (response) {
                        $scope.userGemfiles = response;
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();