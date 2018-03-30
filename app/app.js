module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var commandService = require("./services/command/command.service.server.js")(app);

}