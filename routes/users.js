 var Router = require("express").Router;
var User = require('../models/User');

var usersRouter = new Router();

usersRouter.get('/:name', function(req, res) {
    User.getByName(req.params.name)
    .then(user => {
        console.log('found user is ' + user);
        res.send(user);
    })
    .catch(err => {
        console.log(err);
        res.send(null);
    })
})

usersRouter.post('/', function(req, res) {
    console.log('requset body is ');
    console.log(req.body);
    User.createUser(req.body.name, req.body.password)
    .then(user => {
        console.log(user);
        res.redirect('/cabinet')
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = usersRouter;