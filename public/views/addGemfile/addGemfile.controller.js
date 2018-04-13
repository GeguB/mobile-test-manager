(function () {
    angular
        .module("MobileTestManager")
        .controller("AddGemfileCtrl", AddGemfileCtrl);

    function AddGemfileCtrl($scope, $location, $rootScope, GemfileService) {
        $scope.newGemfile = newGemfile;

        function newGemfile(gemfile, user_id) {
            gemfile.createdBy = user_id;
            gemfile.updatedOn = Date.now();
            GemfileService
                .addGemfile(gemfile)
                .then(
                    function () {
                        $scope.message = "Gemfile has been added."

                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();