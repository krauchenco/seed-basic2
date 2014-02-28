var util = require('./lib/util');
var obj = util.getJsonOrDie(__dirname + "/conf.json", "env", "port", {env:"prod", port:"80"});
console.log(JSON.stringify(obj));