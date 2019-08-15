"use strict";

var fs = require("fs");

module.exports.log = function(req, res, next) {
    next();
};

module.exports.msg = function(msg) {
    console.log(msg);
};