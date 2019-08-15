// Level model for handling db

var mongoose = require("mongoose");

var LevelSchema = new mongoose.Schema({
    width:  { type: Number,   required: true },
    height: { type: Number,   required: true },
    map:    { type: [Number], required: true },
    name:   { type: String,   required: true },
    author: { type: String,   required: true },
    date:   { type: Number,   required: true }
})

var Level = mongoose.model('Level', LevelSchema);


//Get all the levels from DB
module.exports.all = function() {
    return Level.find({});
}

module.exports.list = function(sortType, page) {
    switch (sortType) {
        case "byAuthor": return Level.find({})
    }
}

//Сreate a new level
module.exports.add = function(width, height, map, name, author) {
    return new Level({
        width: width,
        height: height,
        map: map,
        name: name,
        author: author,
        date: Date.now()
    }).save();
}

//Find and delete 
module.exports.deleteByID = function(id) {
   return Level.findByIdAndRemove(id);
}

