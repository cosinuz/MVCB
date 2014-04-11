// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');


var app = express();
var port = '8080';

app.use(express.static(__dirname));

http.createServer(app).listen(port);

console.log('running on http://localhost:' + port);
