var Router = require("express").Router;
var User = require('../models/User');

var loginRouter = new Router();

loginRouter.post('/', function(req, res) {
    User.createUser(req.body.name, req.body.password).then(res.redirect('/'))
})