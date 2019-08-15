var Router = require("express").Router;
var Level = require("../models/Level");

var searchRouter = new Router();

searchRouter.get('/', function (req, res) {
    return Level.list('byName', 1, 'wise');
})