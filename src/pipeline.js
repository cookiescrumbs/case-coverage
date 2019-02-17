//
// based on:
//  https://blakeembrey.com/articles/2014/01/compose-functions-javascript/
//
// but done in the opposite order, so it looks like an elixir pipeline:
//  "a |> b |> c"
//
// so:
//  pipeline(a, b, c)()
// would be the same as:
//  c(b(a()))
//
// rather than looping through an array of functions:
//
//   for (var i = 0; i < functions.length; i++) {
//      result = functions[i].call(this, result);
//   }
//
// we're using the Array.reduce method, which calls a callback
// each time, passing an accumulated result back into the callback
//
// the second argument to the callback is the next function in the array
//

function pipeline () {
  var functions = Array.prototype.slice.call(arguments);
  return function (result) {
    var callback = function (result, fn) {
        return fn(result);
    };
    return functions.reduce(callback, result);
  };
}

module.exports = pipeline;