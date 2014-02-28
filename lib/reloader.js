module.exports = function (server, dir) {
  var fs = require('fs');
  var io = require('socket.io').listen(server, {log: false});
  var sioclient = require('socket.io-client');

  if (!fs.existsSync(dir)) {
    console.log("diretório para o reloader não existe: "+dir);
    process.exit(1);
  }

// adicione esta lina nos arquivos que quiser reload
// <script src='http://localhost:8081/socket.io/watcher.js'></script>
  var watcher = [';(function () {',
                 '  var socket = io.connect(\'ws://localhost:'+server.address().port+'\');',
                 '  socket.on(\'update\', function () {',
                 '    location.reload()',
                 '  });',
                 '}())'].join('');

  sioclient.builder(io.transports(), function (err, siojs) {
    if (err) throw err;
    if (!err) {
      io.static.add('/watcher.js', function (path, callback) {
        callback(null, new Buffer(siojs + watcher));
      });
    }
  });

  fs.watch(dir, function (e, f) {
    if (f[0] !== '.') {
      io.sockets.emit('update');
    }
  });
};