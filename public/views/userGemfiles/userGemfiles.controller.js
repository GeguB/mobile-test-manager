(function () {
    angular
        .module("MobileTestManager")
        .controller("UserGemfilesCtrl", UserGemfilesCtrl);

    function UserGemfilesCtrl($scope, $location, $rootScope, GemfileService) {
        $scope.userGemfiles = userGemfiles;
        $scope.selectedGemfile = selectedGemfile;

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

        function selectedGemfile(gemfile_content){
            $scope.selectedGemfile = gemfile_content;
        }
    }
})();