(function()
{
    angular
        .module("MobileTestManager")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($scope, $rootScope, UserService)
    {
        $scope.update = update;

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.message = "Data Updated."
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
