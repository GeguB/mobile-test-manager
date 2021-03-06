(function () {
    angular
        .module("MobileTestManager")
        .controller("UserGemfilesCtrl", UserGemfilesCtrl);

    function UserGemfilesCtrl($scope, $location, $rootScope, GemfileService) {
        $scope.userGemfiles = userGemfiles;
        $scope.selectedGemfile = selectedGemfile;
        $scope.gemfileContent = "";
        $scope.gemfileName = "";

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

        function selectedGemfile(gemfile_content, gemfile_name){
            $scope.gemfileContent = gemfile_content;
            $scope.gemfileName = gemfile_name;
        }
    }
})();