(function () {
    angular
        .module("MobileTestManager")
        .controller("RunSpecCtrl", RunSpecCtrl);

    function RunSpecCtrl($scope, $location, $rootScope, GemfileService) {
        $scope.userGemfiles = userGemfiles;

        function userGemfiles(user_id) {
            GemfileService
                .findGemfilesByUserID(user_id)
                .then(
                    function (response) {
                        var gemfiles = response.data;
                        $scope.userGemfiles = gemfiles;
                        $scope.selectedGemfile = $scope.userGemfiles[0]
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();