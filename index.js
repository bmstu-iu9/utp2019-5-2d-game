var express = require("express");
var mongoose = require("mongoose")

var app = express();

var bodyParser = require("body-parser")

var levelRouter = require("./routes/level")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use('/levels', levelRouter);

app.listen(3012, function() {
    mongoose.connect("mongodb://95.165.163.204:27017/")
    .then(() => console.log("API started"))
    .catch((err) => console.log(err));  
})

