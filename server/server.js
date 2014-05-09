var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');
var mysql = require('mysql');
var cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
var port = '8087';

var data = fs.readFileSync("config.json");
var json = JSON.parse(data);

//hash table mapping if each user is connected or not
var isConnected= {};
var listeOfUsers;
var connection = mysql.createConnection({
host     : 'localhost',
user     : json.mysql.user,
password : json.mysql.password
});

app.engine('html', require('ejs').renderFile);

connection.connect(function (err) { 
        if (err) {
            console.error(err.stack);
            return;
        }
    });

connection.query('USE fablab', function (err, rows, field) {
            if (err) throw err;
        }); 

//initializing the isConnected hash table
listOfUsers = connection.query('SELECT login FROM users');
listOfUsers.on('error', function(err) {
            console.log(err.stack);
            throw err;
        });
console.log("checking the existing users");
console.log("initializing the isConnected hash table");
listOfUsers.on('result', function(row) {
            console.log(row.login + " not connected");
            isConnected[row.login] = false;
        });

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
		res.render('profil.html',{name:req.session.name,mail:req.session.mail});
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
 * Page de test
 */
app.get('/test/:nb', function(req, res) {
	// res.render('test.ejs', {
	// 	nb: req.params.nb
	// });
	// res.render('test.ejs', {
	// 	nb: req.params.nb
	// });

	// Premier rendu.
	res.render('test.ejs', function(err, html){
		var data = {
			title: 'Ma vue',
			body: html
		};

		// Second rendu.
		res.render('layout.ejs', data);
	})
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

		var query = connection.query('SELECT COUNT(*) AS res from users WHERE login= "' + 
            req.body.login + '" AND pw="' + req.body.password + '"');

        query.on('error', function (err) {
                console.log(err.stack);
                throw err;
            });
		query.on('result',function(row,index) {
			val = row.res;
		
			if (val == 1) {
				var sess = req.session;
				sess.login = true;
				sess.name = login;
                console.log("connexion correctly done for " + login);
                isConnected[login] = true;
				
				var q = connection.query('SELECT * FROM users WHERE login= "' + login + '"');
                q.on('error',function (err) {
                        console.log(err.stack);
                        throw err;
                    });
				q.on('result',function(row,index) {
				    sess.mail = row.mail;
				    res.redirect('/');
				});
			} else {
			res.render('login.html');
			}
		});

        //debug function
        //printing who's connected
        query.on('end',function() {
        for(var key in isConnected) {
            if(isConnected.hasOwnProperty(key)) {
                console.log(key + " : " + (isConnected[key]?"connected":"not connected"));
            }
        }
        });
});

http.createServer(app).listen(port);
console.log('running on http://localhost:' + port);
