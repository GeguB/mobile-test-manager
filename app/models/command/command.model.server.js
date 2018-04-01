var mongoose      = require("mongoose");

module.exports = function() {

    var CommandSchema = new mongoose.Schema(
        {
            command: String,
            executedBy: String,
            executionDate: Date,
            status: String,
            exit_code: String,
            stdout: String,
            stderr: String,
            finishDate: Date
        }, {collection: "command"});

    var CommandModel = mongoose.model('CommandModel', CommandSchema);

    var api = {
        addCommand: addCommand,
        updateCommand: updateCommand,
        findCommandByUser: findCommandByUser,
        findCommandById: findCommandById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function addCommand(command) {
        return CommandModel.create(command);
    }

    function updateCommand(commandId, command) {
        return CommandModel.update({_id: commandId}, {$set: command});
    }

    function findCommandByUser(username) {
        return CommandModel.findOne({executedBy: username});
    }

    function getMongooseModel() {
        return CommandModel;
    }

    function findCommandById(userId) {
        return CommandModel.findById(userId);
    }

}