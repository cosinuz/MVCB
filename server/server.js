var fs = require('fs'),
express = require('express'),
https = require('https'),
http = require('http');
var mysql = require('mysql');

var app = express();
var port = '8080';

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'vignesn',
    password : ''
});

connection.connect();
connection.query('USE fablab'); 
app.use(express.static(__dirname));
app.use(require('body-parser')());


// Fonction de login sur la page /login.html
app.post('/login/log', function(req, res) { 
    console.log('Connexion de : ' + req.body.login + ' ');
    console.log('avec le mot de passe : ' + req.body.password + ' ');
	
	connection.query('SELECT COUNT(*) AS res from users WHERE login= "' + req.body.login + '" AND pw="' + req.body.password + '"', function(err, rows, fields) {
   	if (err) {
		console.log('Erreur' + err);
	};
		var val = rows[0].res;
	   	
		if (val == 1) {
		res.redirect('/sucess.html');
		} else {
		res.redirect('/login.html');
		}
	});
    

})

http.createServer(app).listen(port);
console.log('running on http://localhost:' + port);
