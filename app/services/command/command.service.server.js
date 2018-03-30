var shell            = require('shelljs');


module.exports = function(app) {

    var commandModel = require("../../models/command/command.model.server.js")();

    app.get('/api/run-cmd', run_cmd);

    function run_cmd(req, res) {
        //INSERT CORRECT COMMAND HERE
        let command = "pwd";
        let executedBy = "admin";
        let executionDate = Date.now();
        let status = "Running";

        commandModel.addCommand({
            command: command,
            executedBy: executedBy,
            executionDate: executionDate,
            status: status
        });
        console.log("Async cmd execution started.");
        shell.exec(command, {silent: true}, function (code, stdout, stderr) {
            console.log("Executed cmd: ", command);
            if (code === 0)
                status = "SUCCESS";
            console.log("Cmd output: ", stdout);
            if (stderr) {
                status = "ERROR";
                console.log("Cmd stderr: ", stderr);
            }
            commandModel.addCommand({
                command: command,
                executedBy: executedBy,
                executionDate: executionDate,
                status: status,
                exit_code: code,
                stdout: stdout,
                stderr: stderr,
                finishDate: Date.now()
            })
        });
        res.sendStatus(200)
    }
};