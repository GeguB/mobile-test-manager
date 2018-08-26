var mongoose         = require("mongoose");
module.exports = function(app) {

    var gemfileModel = require("../../models/gemfile/gemfile.model.server.js")();

    app.post('/api/add/gemfile', addGemfile);
    app.get('/api/gemfiles', findGemfilesByUserID);
    app.get('/api/gemfile', findGemfileByGemfileID);

    function addGemfile(req, res) {
        let newGemfile = req.body;
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

    function findGemfileByGemfileID(req, res) { //not tested
        gemfileModel.findGemfileByGemfileID(req.query.gemfileID)
            .then(
                function (gemfile) {
                    res.json(gemfile);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

};