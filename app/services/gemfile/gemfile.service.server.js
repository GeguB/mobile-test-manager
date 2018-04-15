var mongoose         = require("mongoose");
module.exports = function(app) {

    var gemfileModel = require("../../models/gemfile/gemfile.model.server.js")();

    app.post('/api/add/gemfile', addGemfile);
    app.get('/api/gemfiles', findGemfilesByUserID);

    function addGemfile(req, res) {
        var newGemfile = req.body;
        gemfileModel.addGemfile(newGemfile)
            .then(
                res.sendStatus(200))
        ;
    }
    function findGemfilesByUserID(req, res) {
        gemfileModel
            .findGemfilesByUserID(req.query.userID)
            .then(
                function (gemfiles) {
                    res.json(gemfiles);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }



}