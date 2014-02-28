var express = require('express'),
  routes = require('./lib/routes'),
  util = require('./lib/util'),
  http = require('http'),
  app = express(),
  server = http.createServer(app);

conf = util.getJsonOrDie(__dirname+"/conf.json", "env", "port",
  {env:"prod", port: "80"});

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  var erroropts = { dumpExceptions: true, showStack: true };
  if (conf.env === 'prod') {
    erroropts = {};
  }
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler(erroropts));
});

app.get('/', routes.index);

server.listen(conf.port);

console.log('listening on port '+server.address().port);
var reloader = require('./lib/reloader')(server, __dirname+'/public');