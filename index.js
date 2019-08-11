"use strict";

var express = require("express");
var mongoose = require("mongoose");

var logger = require("./logger");

var app = express();

/*
var express = require('express');

var app = express();




app.use('/:name', function(req, res) {
    let name = req.params.name;
    switch(name) {
        case 'cabinet': case 'input': case 'registration': 
            return res.sendFile(__dirname + '/view/html/' + name + '.html');
        default: 
            return res.sendStatus(404);
    }
});

app.listen(3012, function() {
    console.log('API started');
})

*/
var bodyParser = require("body-parser")

var levelRouter = require("./routes/level")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(express.static('view'));

app.use('/levels', levelRouter);

app.listen(3012, function() {
    mongoose.connect("mongodb://95.165.163.204:27017/", { useNewUrlParser: true })
    .then(() => logger.log("API started"))
    .catch((err) => logger.log(err));  
})

