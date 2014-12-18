# Working with Promises

A quick demo project while I figure out promises in [q](https://github.com/kriskowal/q).

## q.call

`q.call` turns a function with a callback into a promise. The arguments of the callback become the arguments of `then`.

``` javascript
// http.request returns a response via a callback
q.call(http.request, { host: 'www.google.com', port: 80 }).then(function (response) {
  console.log(response);
});
```

## q.fcall

`q.fcall` turns any function into a callback. The result of the function is passed to `then`.

``` javascript
function sum(a, b) {
  var sum = 0;
  for (var i = 0, len = arguments.length; i <len; i++) {
    sum += arguments[i];
  }
  return sum;
}

q.fcall(sum, 1, 2, 3).then(function (res) {
  console.log('sum:', res);
});
```

## q.nfcall

`q.nfcall` turns a function with a two-variable callback into a promise. The variables of the callback should have the header `function (error, result)`.

``` javascript
q.nfcall(fs.writeFile(pathToFile, 'Hello, World!').then(function (result) {
  console.log('result:', result);
}).catch(function (error) {
  console.log('error:', error);
});
```
