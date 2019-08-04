// Level model for handling db

var mongoose = require("mongoose");


var levelSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    map: [Number],
    name: String,
    author: String
})

var Level = mongoose.model('Level', levelSchema);


//Get all the levels from DB
module.exports.all = function() {
    return Level.find({});
}


//Сreate a new level
module.exports.add = function(width, height, map, name, author) {
    return new Level({
        width: width,
        height: height,
        map: map,
        name: name,
        author: author
    }).save();
}


//Find and delete 
module.exports.deleteByID = function(id) {
   return Level.findByIdAndRemove(id);
}

