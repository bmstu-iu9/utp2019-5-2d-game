var Router = require("express").Router;
var User = require('../models/User');
var tokenizer = require('../util/token')

var loginRouter = new Router();

loginRouter.post('/', function(req, res) {
    var user = req.body;
    User.getByName(req.body.name)
    .then(function(user) {
        //console.log(user);
        if (!user) throw new Error('user not found')
        return User.validatePassword(user, req.body.password);
    })
    .then(function(validUser) {
         return tokenizer.sign(validUser);
    })
    .then(function(token) {
        res.cookie('token', token);
        res.redirect('/cabinet');
    })
    .catch()
})

module.exports = loginRouter;