"use strict";
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger');
var levelRouter = require('./routes/level');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(logger.log);

app.use('/levels', levelRouter);
app.use('/users', usersRouter);

app.use('/:name', function(req, res) {
    let name = req.params.name,
        token = req.body.token;
    //if (!token) return res.redirect('/input');
    switch(name) {
        case 'cabinet': case 'input': case 'registration': case 'search': case 'creation': case 'gamepage': case 'view':
            return res.sendFile(__dirname + '/public/html/' + name + '.html')
        default:
            return res.sendStatus(404);
    }
});


app.listen(3012, function() {
    //if (null) console.log('is null')
    mongoose.connect("mongodb://localhost:27017/labirynth", { useNewUrlParser: true })
    .then(() => logger.msg("API started"))
    .catch((err) => logger.msg(err));
})
