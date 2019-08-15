"use strict";

var express = require("express");
var mongoose = require("mongoose");

var logger = require("./logger");

var app = express();

var bodyParser = require("body-parser")

var levelRouter = require("./routes/level")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(logger.log);

app.use('/levels', levelRouter);

app.get('/search', function(req, res) {
    res.sendFile(__dirname + '/public/html/search.html');
})

app.listen(3012, function() {
    mongoose.connect("mongodb://localhost:27017/labirynth", { useNewUrlParser: true })
    .then(() => logger.msg("API started"))
    .catch((err) => logger.msg(err));
})

