var mongoose      = require("mongoose");

module.exports = function() {

    var DeviceSchema = new mongoose.Schema(
        {
            name: String,
            androidVer: String,
            yearOfProduction: Number,
            producent: String,
            appiumPort: Number,
            udid: String,
            state: {type: String, default: "Offline" },
            addedBy: String, //userID
            updatedOn: Date
        }, {collection: "device"});

    var DeviceModel = mongoose.model('DeviceModel', DeviceSchema);

    var api = {
        addDevice: addDevice,
        updateDevice: updateDevice,
        getAllDevices: getAllDevices,
        getMongooseModel: getMongooseModel
    };
    return api;

    function addDevice(gemfile) {
        return DeviceModel.create(gemfile);
    }

    function updateDevice(deviceId, device) {
        return DeviceModel.update({_id: deviceId}, {$set: device});
    }

    function getAllDevices() {
        return DeviceModel.find()
    }

    function getMongooseModel() {
        return DeviceModel;
    }

}