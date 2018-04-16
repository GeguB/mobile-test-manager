var mongoose      = require("mongoose");

module.exports = function() {

    var StepSchema = new mongoose.Schema(
        {
            name: String,
            content: String,
            createdBy: String, //userID
            applicationName: String, //can be assigned to a specific test application
            updatedOn: Date
        }, {collection: "step"});

    var StepModel = mongoose.model('StepModel', StepSchema);

    var api = {
        createStep: createStep,
        updateStep: updateStep,
        findStepsByUserID: findStepsByUserID,
        findApplicationNamesForUser: findApplicationNamesForUser,
        findStepsForUserByApplicationName: findStepsForUserByApplicationName,
        getMongooseModel: getMongooseModel
    };
    return api;

    function createStep(step) {
        return StepModel.create(step);
    }

    function updateStep(stepId, step) {
        return StepModel.update({_id: stepID}, {$set: step});
    }

    function findStepsByUserID(user_id) {
        return StepModel.where({createdBy: user_id}).find().sort({updatedOn: -1});
    }

    function findApplicationNamesForUser(user_id) { //not tested
        let allSteps = findStepsByUserID(user_id);
        let applicationNames = [];
        for (s in allSteps){
            if (s.applicationName)
                applicationNames.push(s.applicationName);
        }
        return applicationNames.filter((v, i, a) => a.indexOf(v) === i)
    }

    function findStepsForUserByApplicationName(user_id, applicationName) {
        return StepModel.where({createdBy: user_id, applicationName: applicationName}).find().sort({updatedOn: -1});
    }

    function getMongooseModel() {
        return StepModel;
    }

}