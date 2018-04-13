var mongoose      = require("mongoose");

module.exports = function() {

    var GemfileSchema = new mongoose.Schema(
        {
            name: String,
            content: String,
            createdBy: String, //userID
            updatedOn: Date,
            finishDate: Date
        }, {collection: "gemfile"});

    var GemfileModel = mongoose.model('GemfileModel', GemfileSchema);

    var api = {
        addGemfile: addGemfile,
        updateGemfile: updateGemfile,
        findGemfileByUser: findGemfileByUser,
        findGemfileById: findGemfileById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function addGemfile(gemfile) {
        return GemfileModel.create(gemfile);
    }

    function updateGemfile(gemfileId, gemfile) {
        return GemfileModel.update({_id: gemfileId}, {$set: gemfile});
    }

    function findGemfileByUser(username) {
        return GemfileModel.findOne({createdBy: username});
    }

    function getMongooseModel() {
        return GemfileModel;
    }

    function findGemfileById(gemfileId) {
        return GemfileModel.findById(gemfileId);
    }

}