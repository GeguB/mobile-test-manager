(function () {
    angular
        .module("MobileTestManager")
        .factory("StepService", StepService);

    function StepService($http) {
        let api = {
            createStep: createStep,
            findStepsByUserID: findStepsByUserID,
        };
        return api;

        function createStep(step) {
            return $http.post('/api/add/step', step)
        }

        function findStepsByUserID(userID) {
            return $http.get('/api/steps', {params: {userID: userID}})
        }
    }
})();