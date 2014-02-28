module.exports = function () {
  var ret = {};
  ret. index = function (req, res) {
    res.redirect("/index.html");
  }
  return ret;
}();