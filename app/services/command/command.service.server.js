var shell            = require('shelljs');


module.exports = function(app) {

    var commandModel = require("../../models/command/command.model.server.js")();

    app.post('/api/run-cmd', run_cmd);

    function run_cmd(req, res) {
        let new_command = req.body;
        commandModel.addCommand(new_command)
        console.log("Async cmd execution started.");
        shell.exec(new_command.command, {silent: true}, function (code, stdout, stderr) {
            console.log("Executed cmd: ", new_command.command);
            if (code === 0)
                status = "SUCCESS";
            else
                status = "CANNOT COMPUTE"
            console.log("Cmd output: ", stdout);
            if (stderr) {
                status = "ERROR";
                console.log("Cmd stderr: ", stderr);
            }
            commandModel.addCommand({
                command: new_command.command,
                executedBy: new_command.executedBy,
                executionDate: new_command.executionDate,
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