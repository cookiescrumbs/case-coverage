module.exports = function () {
  var functions = Array.prototype.slice.call(arguments);
  return function (result) {
    var callback = function (result, fn) {
        return fn(result);
    };
    return functions.reduce(callback, result);
  };
};
