
var express = require('express');

var app = express();


app.use(express.static('public'));

app.use('/:name', function(req, res) {
    let name = req.params.name;
    switch(name) {
        case 'cabinet': case 'input': case 'registration': case 'search':
            return res.sendFile(__dirname + '/public/html/' + name + '.html');
        default:
            return res.sendStatus(404);
    }
});

app.listen(3012, function() {
    console.log('API started');
})
