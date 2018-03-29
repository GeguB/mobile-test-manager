var cmd = require('node-cmd');

module.exports = function(app) {

    app.get  ('/api/run-cmd', run_cmd);
    function run_cmd(req, res) {

    }

}