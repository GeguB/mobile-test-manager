var shell = require('shelljs');
var fs = require('fs');
var readline = require('line-reader');


module.exports = function (app) {

    var commandModel = require("../../models/command/command.model.server.js")();

    var home = shell.exec(`echo $HOME`, {silent: true}).stdout;
    home = home.slice(0, -1);


    app.post('/api/run-cmd', run_cmd);
    app.post('/api/run-test', run_test);

    function run_cmd(req, res) {
        let new_command = req.body;
        commandModel.addCommand(new_command);
        console.log("Async cmd execution started.");
        shell.exec(new_command.command, {silent: true}, function (code, stdout, stderr) {
            console.log("Executed cmd: ", new_command.command);
            if (code === 0)
                status = "SUCCESS";
            else
                status = "CANNOT COMPUTE";
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
        let timestamp = Date.now();
        if (checkIfDirectoryExists(req.body) === false)
            createUserDirectory(req.body);
        kill_appium(req.body['device_port']);
        buildGemfile(req.body, timestamp);
        bundleUpdate(req.body, timestamp)
            .then(x => {
                    createSpecFile(req.body, timestamp);
                    run_appium(req.body, timestamp);
                    setTimeout(function () {
                        runTest(req.body, timestamp)
                    }, 3000);
                }
            );
        //exposeLogs
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

    function buildGemfile(body, timestamp) {
        let user_id = body['user_id'];
        let gemfile_id = body['gemfile_id'];
        let gemfile_content = body['gemfile_content'];
        gemfile_content = unescape(gemfile_content);
        let path = `${home}/mtm-workspace/${user_id}/Gemfile`;
        fs.writeFile(path, gemfile_content, function (err) {
            if (err) {
                console.log(err)
            }
            else console.log(`Gemfile ${gemfile_id} has been created`)
        });
    }

    function getGems(body, timestamp) {
        let user_id = body['user_id'];
        let gemfile_path = `${home}/mtm-workspace/${user_id}/Gemfile`;
        let gems = [];
        return new Promise(function (resolve, reject) {
            readline.eachLine(gemfile_path, function (line, last) {
                if (line.includes('gem ')) {
                    let gem = line.split(' ');
                    if (gem[1].slice(-1) === ',')
                        gems.push(gem[1].slice(0, -1));
                    else
                        gems.push(gem[1]);
                }
                if (last) {
                    resolve(gems);
                }
            });
        })
    }

    function includeGems(body, timestamp) {
        let requireString = "";
        return new Promise(function (resolve, reject) {
            getGems(body, timestamp).then(gems => {
                    for (g in gems) {
                        requireString += `require ${gems[g]}\n`;
                    }
                    requireString += `\n`;
                    resolve(requireString)
                }
            )

        })
    }

    function getOptions(body) { //device options should be taken from DB
        let options = {};
        return new Promise(function (resolve, reject) {
            options.appPackage = 'com.android.settings'; //hardcoded for testing
            options.deviceName = body['deviceName'];
            options.udid = body['udid'];
            options.device_port = body['device_port'];
            resolve(options);
        })
    }


    function includeOptions(body) {
        let requireString = "";
        return new Promise(function (resolve, reject) {
            getOptions(body).then(
                options => {
                    requireString += `options = {\n`;
                    requireString += `caps: {\n`;
                    requireString += `platformName: 'Android',\n`;
                    requireString += `appPackage: '${options.appPackage}',\n`;
                    requireString += `appActivity: '.Settings',\n`;
                    requireString += `deviceName: '${options.deviceName}',\n`;
                    requireString += `udid: '${options.udid}'\n`;
                    requireString += `},\n`;
                    requireString += `appium_lib: {\n`;
                    requireString += `port: '${options.device_port}'`;
                    requireString += `},\n`;
                    requireString += `launchTimeout: 20000\n`;
                    requireString += `}\n`;
                    requireString += `RSpec.configure do |config|\n`;
                    requireString += `config.before(:all) do\n`;
                    requireString += `@driver = Appium::Driver.new(options, true).start_driver\n`;
                    requireString += `@driver.manage.timeouts.implicit_wait = 3\n`;
                    requireString += `end\n`;
                    requireString += `config.after(:all) do\n`;
                    requireString += `@driver.quit\n`;
                    requireString += `end\n`;
                    requireString += `end\n`;
                    resolve(requireString);
                }
            )

        })
    }

    function includeSteps(body) {
        let stepsString = "";
        return new Promise(function (resolve, reject) {
            stepsString += `describe '${body['test_run_name']}' do
                                ${unescape(body['step_content'])}
                            end`;
            resolve(stepsString);
        })

    }

    function createSpecFile(body, timestamp) {
        let user_id = body['user_id'];
        let path = `${home}/mtm-workspace/${user_id}/${timestamp}_spec.rb`;

        let specString = "";
        Promise.all([includeGems(body, timestamp), includeOptions(body), includeSteps(body)])
            .then(result => {
                specString = result.join('');
                fs.writeFile(path, specString, function (err) {
                    if (err) {
                        console.log(err)
                    }
                    else console.log(`Spec file for user ${user_id} has been created`)
                });
            });
    }

    function runTest(body, timestamp) {
        let user_id = body['user_id'];
        let spec_path = `${home}/mtm-workspace/${user_id}/${timestamp}_spec.rb`;
        let gemfile_path = `${home}/mtm-workspace/${user_id}/Gemfile`;
        console.log(`BUNDLE_GEMFILE=${gemfile_path} bundle exec rspec ${spec_path}`);
        shell.exec(`BUNDLE_GEMFILE=${gemfile_path} bundle exec rspec ${spec_path}`);

    }

    function bundleUpdate(body, timestamp) {
        let user_id = body['user_id'];
        let gemfile_path = `${home}/mtm-workspace/${user_id}/Gemfile`;
        return new Promise(function (resolve, reject) {
            shell.exec(`BUNDLE_GEMFILE=${gemfile_path} bundle install`);
            resolve();
        })
    }

    function run_appium(body, timestamp) {
        port = body['device_port'];
        let user_id = body['user_id'];
        let log_path = `${home}/mtm-workspace/${user_id}/${timestamp}_appium.log`;
        shell.exec(`appium -p ${port} > ${log_path}`, {async: true});
        console.log(`Appium for user ${user_id} has been started on port ${port}`)
    }

    function kill_appium(port) {
            let pid = shell.exec(`echo $(lsof -i | grep ${port}) | cut -d " " -f 2`, {silent: true}).stdout;
            if (pid)
            {console.log(`Test ended. Killing appium on port ${port} with pid ${pid}`);
            shell.exec(`kill -9 ${pid}`)}
            else
                console.log(`Appium not running on port ${port}`)
    }
};