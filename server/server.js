// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');


var app = express();

app.use(express.static(__dirname));

http.createServer(app).listen(8001);

console.log('running on http://localhost:8001');
