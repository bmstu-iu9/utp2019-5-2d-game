'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var ObjectID = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    maps: { type: [ObjectID] }
});

var User = mongoose.model('User', UserSchema);

module.exports.validatePassword = function(user, pwd) {
    return new Promise(function(resolve, reject) {
        crypto.pbkdf2(pwd, user.salt, 1000, 64, 'sha512', function(err, hash) {
            if (err) return reject(err);
            if (hash.toString('hex') === user.hash) return resolve(user);
            return reject('password incorrect');
        })
    })
}

module.exports.createUser = function(name, password) {
    return new Promise(function(resolve, reject) {
       crypto.randomBytes(8, function(err, salt) {
           if (err) return reject(err);
            crypto.pbkdf2(password, salt.toString('hex'), 1000, 64, 'sha512', function (err, hash) {
                //console.log(hash.toString('hex'));
                resolve({
                    salt: salt.toString('hex'), 
                    hash: hash.toString('hex')
                });
            })
       })
    })
    .then((pwd) => {
        //console.log(salt);
        //console.log(hash);
        return new User({
            username: name,
            salt: pwd.salt,
            hash: pwd.hash,
            maps: []
        }).save();
    });
}

module.exports.getByName = function(name) {
    return User.findOne({username: name});
}

