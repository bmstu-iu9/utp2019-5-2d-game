//https://github.com/crypto-browserify/pbkdf2 for the pdkdf2
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
}
