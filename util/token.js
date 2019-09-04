var crypto = require('crypto');

var secret = 'abdominal';

module.exports.sign = function(payload) {
    return new Promise(function(resolve, reject) {
        const objString = Buffer.from(JSON.stringify(payload)).toString('base64');
        crypto.pbkdf2(objString, secret, 1000, 256, 'sha256', function (err, hash) {
            if (err) reject(err);
            const token = objString + '.' + hash.toString('base64');
            //console.log(token);
            resolve(token);
        })
    })
}

module.exports.validate = function(token) {
    return new Promise(function(resolve, reject) {
        arr = token.split('.');
        const 
            payloadString = arr[0],
            tokenHash = arr[1];
            //console.log(tokenHash);

        crypto.pbkdf2(payloadString, secret, 1000, 256, 'sha256', function (err, payloadHash) {
            if (err) reject(err);
            //console.log(payloadHash.toString('base64'));
            if (payloadHash.toString('base64') === tokenHash) {
                resolve(JSON.parse(Buffer.from(payloadString, 'base64').toString('utf-8')));
            } else reject('token not valid');
            
        })
    })
}