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

UserSchema.methods.validPassword = function(pwd) {
    var hash = crypto.pbkdf2(pwd, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

module.exports.createUser = function(name, password) {
    var
        salt = crypto.randomBytes(8).toString('hex'),
        hash = crypto.pbkdf2(pwd, this.salt, 1000, 64, 'sha512').toString('hex');

    return new User({
        name: name,
        salt: salt,
        hash: hash,
        maps: []
    }).save();

}

module.exports.getUserByName = function(name) {
    return User.find({name: name});
}

