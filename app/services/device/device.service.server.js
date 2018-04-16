var mongoose         = require("mongoose");
module.exports = function(app) {

    var deviceModel = require("../../models/device/device.model.server")();

    app.post('/api/add/device', addDevice);
    app.get('/api/devices', getAllDevices);

    function addDevice(req, res) {
        var newDevice = req.body;
        deviceModel
            .addDevice(newDevice)
            .then(
                res.sendStatus(200))
        ;
    }
    function getAllDevices(req, res) {
        deviceModel
            .getAllDevices()
            .then(
                function (devices) {
                    res.json(devices);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }



}