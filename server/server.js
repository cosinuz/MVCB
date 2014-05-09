var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');
var mysql = require('mysql');
var cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
var port = '8087';

var connection = mysql.createConnection({
host     : 'localhost',
user     : 'vignesn',
password : 'darkknight23'
});

app.engine('html', require('ejs').renderFile);

connection.connect();
connection.query('USE fablab'); 
app.use(express.static(__dirname));
app.use(require('body-parser')());

/* Init for Session */
app.use(cookieParser());
app.use(session({secret: '12545riezejkzekzekezjk8', key: '212245sssde', cookie: {secure : false}}));


/**
  Home 
 */
app.get('/',function(req,res) {
		if (req.session.login) {
		console.log('Connecte');
		} else {	
		console.log('Pas connecte');
		}
		res.render('index.html');

		});
/**
 Profil utilisateur 
*/
app.get('/me',function(req,res) {
	if (req.session.login) {
		res.render('profil.html',{name:req.session.name});
	} else {
		res.redirect('/login');
	}


});



/**
  Page de login 
 */
app.get('/login',function(req,res) {
		if (req.session.login) {
		console.log('Deja connecte');
		res.redirect('/');
		} else {
		console.log('Pas encore connecte');
		res.render('login.html');
		}

		});


/** 
  Fonction de tratitement du login sur la page /login.html 
 */
app.post('/login/log', function(req, res) { 

		console.log('Connexion de : ' + req.body.login + ' ');
		console.log('avec le mot de passe : ' + req.body.password + ' ');
		var login = req.body.login;		
		var mail;
		var val;

		var query = connection.query('SELECT COUNT(*) AS res from users WHERE login= "' + req.body.login + '" AND pw="' + req.body.password + '"');
		query.on('result',function(row,index) {
			val = row.res;
			console.log(row.res);
		
			console.log('En dehors de MySQL ' + val);
			if (val == 1) {
			var sess = req.session;
			sess.login = true;
			sess.name = login;
			sess.mail = '';
			res.redirect('/');
			//res.redirect("sucess.html",{login:req.session.login});
			} else {
			res.render('login.html');
			}
		});

});

http.createServer(app).listen(port);
console.log('running on http://localhost:' + port);
