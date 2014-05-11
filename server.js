// server.js (Express 4.0)
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  app = express(),
  routes = require('./lib/routes'),
  util = require('./lib/util')
  ;

var conf = util.getJsonOrDie(__dirname + "/conf.json", "env", "port",
  {env: "prod", port: "80"});


app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.get('/', routes.index);

var http = require('http');
var server = http.createServer(app);

//app.listen(8080);
server.listen(8080);

console.log('Magic happens on port 8080'); 			// shoutout to the user

var reloader = require('./lib/reloader')(server, __dirname + '/public');


//////////////
//var express = require('express'),
//  routes = require('./lib/routes'),
//  util = require('./lib/util'),
//  http = require('http'),
//  app = express(),
//  server = http.createServer(app);
//
//conf = util.getJsonOrDie(__dirname + "/conf.json", "env", "port",
//  {env: "prod", port: "80"});
//
////app.configure(function () {
//app.set(express.bodyParser());
//app.set(express.methodOverride());
//app.set(app.router);
////  var erroropts = { dumpExceptions: true, showStack: true };
////  if (conf.env === 'prod') {
////    erroropts = {};
////  }
//app.set(express.static(__dirname + '/public'));
//app.set(express.errorHandler({ dumpExceptions: true, showStack: true }));
////});
//
//app.get('/', routes.index);
//
//server.listen(conf.port);
//
//console.log('listening on port ' + server.address().port);
//var reloader = require('./lib/reloader')(server, __dirname + '/public');