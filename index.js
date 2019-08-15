/*//https://github.com/crypto-browserify/pbkdf2 for the pdkdf2
var pbkdf2 = require('pbkdf2')


//Create and send JSON-obj
module.exports.MethodData = function(type, url, info) {
	if (arguments.length !== 3) {
		throw 'Not enough of arguments'
	}
	if (type === "POST") {
		if (url === "/register") {
			return JSON.stringify({
				method : type,
				info : JSON.stringify(info),
			});
		}
	}
}


//Post request
module.exports.Post = function (req) {
	try { 
		MethodData('POST', "/register", 
		{username : req.username,
		login : req.login,
		password : pbkdf2.pbkdf2(req.password, 'firstTrynotAbadIdea', 1, 32, 'sha512'),
		repeat : pbkdf2.pbkdf2(req.repeatpw, 'ButYouNeverKnow', 1, 32, 'sha512')})
	} catch (err) {
		console.err(err);
	}
}*/

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
        case 'cabinet': case 'input': case 'registration': case 'search':
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

