var shell = require('shelljs');
var fs = require('fs');


module.exports = function (app) {

    var commandModel = require("../../models/command/command.model.server.js")();

    var home = shell.exec(`echo $HOME`, {silent: true}).stdout;
    home = home.slice(0, -1);


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
        buildGemfile(req.body);
        createSpecFile(req.body);
        run_appium(req.body);
        kill_appium(req.body['device_port']);

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

    function buildGemfile(body){
        let user_id = body['user_id'];
        let gemfile_id = body['gemfile_id'];
        let gemfile_content = body['gemfile_content'];
        gemfile_content = unescape(gemfile_content)
        console.log(`Building new gemfile for ${gemfile_id}`);
        let path = `${home}/mtm-workspace/${user_id}/gemfile_${gemfile_id}`;
        console.log(path);

        fs.writeFile(path, gemfile_content, function (err) {
            if(err) {
                console.log(err)
            }
            else console.log(`Gemfile ${gemfile_id} has been created`)
        });
    }

    function createSpecFile(body){
        let user_id = body['user_id'];
        let step_content = body['step_content'];
        step_content = unescape(step_content);
        console.log(`Building new spec file for user ${user_id}`);

        let path = `${home}/mtm-workspace/${user_id}/${Date.now()}_spec.rb`;
        fs.writeFile(path, step_content, function (err) {
            if(err) {
                console.log(err)
            }
            else console.log(`Spec file for user ${user_id} has been created`)
        });
    }

    function run_appium(body) {
        let port = body['device_port'];
        let user_id = body['user_id'];
        let log_path = `${home}/mtm-workspace/${user_id}/${Date.now()}_appium.log`;
        shell.exec(`appium -p ${port} > ${log_path} &`, {async:true});
        console.log(`Appium for user ${user_id} has been started on port ${port}`)
    }

    function kill_appium(port) {
        setTimeout(function() {
            let pid = shell.exec(`echo $(lsof -i | grep ${port}) | cut -d " " -f 2`, {silent: true}).stdout;
            console.log(`Test ended. Killing appium on port ${port} with pid ${pid}`);
            shell.exec(`kill -9 ${pid}`)
        }, 3000);
    }
};