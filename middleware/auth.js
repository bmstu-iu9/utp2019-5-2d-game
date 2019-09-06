var tokenizer = require('../util/token');

module.exports = function(req, res, next) {
    new Promise(function(resolve, reject) {
        const token = req.cookies.token;
        console.log(token);
        if (!token) return reject('token not found');
        return resolve(tokenizer.validate(token));
    })
    .then(function(user) {
        req.user = user;
        console.log(user);
        next();
    })
    .catch(function(err) {
        console.log(err);
        return res.redirect('/input')
    });
}