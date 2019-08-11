
var express = require('express');

var app = express();


app.use(express.static('view'));

app.use('/:name', function(req, res) {
    let name = req.params.name;
    switch(name) {
        case 'cabinet': case 'input': case 'registration': 
            return res.sendFile(__dirname + '/view/html/' + name + '.html');
        default: 
            return res.sendStatus(404);
    }
});

app.listen(3012, function() {
    console.log('API started');
})

