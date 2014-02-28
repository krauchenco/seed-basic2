var fs = require('fs');
module.exports = function () {
  var ret = {};
  ret.getJsonOrDie = function () {
    if (arguments.length < 3) throw new Error("parametros invalidos: ", arguments);
    var filename = arguments[0];
    var padrao = arguments[arguments.length - 1];
    if (!fs.existsSync(filename)) {
      console.log("Arquivo "+filename+" inexistente! Criando um com valores defaults");
      console.log("Por favor, preencha-o com os valores corretos");
      fs.writeFileSync(filename, JSON.stringify(padrao, null, 4));
      process.exit(1);
    }
    var json = JSON.parse(fs.readFileSync(filename).toString());
    var count = 0, erro = [];
    for (var k in arguments) {
      if ('0' != k && (arguments.length-1) != k) {
        var v = arguments[k];
        if (!eval('json.'+v)){
          erro.push(v);
        }
      }
    }
    if (erro.length == arguments.length - 2) {
      // todos errados
      console.log('não havia variável, regerando o arquivo para preenchimento: '+filename);
      fs.writeFileSync(filename, JSON.stringify(padrao, null, 4));
      process.exit(1);
    } else if (erro.length > 0) {
      console.log("variáveis faltantes: "+erro.join(','));
      console.log('adicione-os no arquivo '+filename);
      process.exit(1);
    }
    return json;
  }
  return ret;
}();