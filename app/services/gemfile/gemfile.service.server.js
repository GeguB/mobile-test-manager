var mongoose         = require("mongoose");
module.exports = function(app) {

    var gemfileModel = require("../../models/gemfile/gemfile.model.server.js")();

    app.post('/api/add/gemfile', addGemfile);

    function addGemfile(req, res) {
        var newGemfile = req.body;
        gemfileModel.addGemfile(newGemfile)
            .then(
                res.sendStatus(200))
        ;
    }
}