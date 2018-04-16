module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var commandService = require("./services/command/command.service.server.js")(app);
    var gemfileService = require("./services/gemfile/gemfile.service.server.js")(app);
    var deviceService = require("./services/device/device.service.server.js")(app);
    var stepService = require("./services/step/step.service.server")(app);

}