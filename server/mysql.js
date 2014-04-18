var mysql = require('mysql');

var connection = mysql.createConnection({
          host     : 'localhost',
            user     : 'vignesn',
              password : 'darkknight23'
              });

connection.connect();
connection.query('USE fablab'); //we use the fablab database
connection.query('SELECT * from users', function(err, rows, fields) {
          if (err) throw err;

            console.log('The solution is: ', rows);
            });

connection.end();
