module.exports = function(app) {

    var stepModel = require("../../models/step/step.model.server")();

    app.post('/api/add/step', createStep);
    app.get('/api/steps', findStepsByUserID);

    function createStep(req, res) {
        let newStep = req.body;
        stepModel
            .createStep(newStep)
            .then(
                res.sendStatus(200)
                );
    }
    function findStepsByUserID(req, res) {
        stepModel
            .findStepsByUserID(req.query.userID)
            .then(
                function (steps) {
                    res.json(steps);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};