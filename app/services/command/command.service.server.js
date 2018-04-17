var shell = require('shelljs');


module.exports = function (app) {

    var commandModel = require("../../models/command/command.model.server.js")();

    app.post('/api/run-cmd', run_cmd);
    app.post('/api/run-test', run_test);

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

    function run_test(req, res) {
        console.log(req.body);

        if (checkIfDirectoryExists(req.body) === false)
            createUserDirectory(req.body);
        else
            console.log(`Directory for user ${req.body['user_id']} already exists`);

        res.sendStatus(200)
    }



    function checkIfDirectoryExists(body) {
        let user_id = body['user_id'];
        let a = shell.exec(`ls $HOME/mtm-workspace`, {silent: true}).stdout;
        return a.includes(user_id)
    }

    function createUserDirectory(body) {
        let user_id = body['user_id'];
        console.log(`Creating new directory for user ${user_id}`);
        shell.exec(`mkdir $HOME/mtm-workspace/${user_id}`)
    }
};