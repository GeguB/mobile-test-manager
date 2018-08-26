var mongoose      = require("mongoose");

module.exports = function() {

    var TestRunSchema = new mongoose.Schema(
        {
            userID: String,
            gemfileID: String,
            deviceID: String,
            status: String,
            startDate: Date,
            exit_code: String,
            stdout: String,
            stderr: String,
            finishDate: Date
        }, {collection: "command"});

    var TestRunModel = mongoose.model('TestRunModel', TestRunSchema);

    var api = {
        newTestRun: newTestRun,
        updateTestRun: updateTestRun,
        findTestRunByUser: findTestRunByUser,
        findTestRunById: findTestRunById,
        getMongooseModel: getMongooseModel
    };
    return api;
};