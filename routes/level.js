var Router = require("express").Router;
var Level = require("../models/Level");

var levelEditorRouter = new Router();

levelEditorRouter.get('/', function(req, res) {
    Level.all().then(docs => res.send(docs)).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
})

levelEditorRouter.post('/', function(req, res) {
    var body = req.body;
    Level.add(
        body.width,
        body.height,
        body.map,
        body.name,
        body.author
    ).then((doc) => res.send(doc))
    .catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
})

levelEditorRouter.delete('/:id', function(req, res) {
    Level.deleteByID(req.params.id).then(() =>
        res.sendStatus(200)
    ).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
});


module.exports = levelEditorRouter;
