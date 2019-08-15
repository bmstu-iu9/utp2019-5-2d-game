
"use strict";
var express = require('express');

var app = express();

var bodyParser = require("body-parser")



app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(logger.log);

app.use(express.static('public'));

app.use('/:name', function(req, res) {
    let name = req.params.name;
    switch(name) {
        case 'cabinet': case 'input': case 'registration': case 'search':
            return res.sendFile(__dirname + '/public/html/' + name + '.html');
        default:
            return res.sendStatus(404);
    }
});

app.listen(3012, function() {
    mongoose.connect("mongodb://localhost:27017/labirynth", { useNewUrlParser: true })
    .then(() => logger.msg("API started"))
    .catch((err) => logger.msg(err));
})


