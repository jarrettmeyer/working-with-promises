var q = require('q');


function add(a, b) {
    var args = Array.prototype.splice.call(arguments, 0);
    var sum = 0;
    args.forEach(function (arg) {
        sum += arg;
    });
    return sum;
}


function delayedAdd(a, b, callback) {
    var args = Array.prototype.splice.call(arguments, 0);
    var callback = args.pop();
    var sum = 0;
    if (args.length === 0) {
        return callback('No values to add.');
    }
    args.forEach(function (arg) {
        sum += arg;
    });
    return callback(null, sum);
}

/* Use nfcall to turn any node callback-based function into a promise. */
q.nfcall(delayedAdd, 1, 2, 3).then(function (sum) {
    console.log('sum using nfcall:', sum);
});

/* nfcall can also catch errors when the error is returned as the first argument. */
q.nfcall(delayedAdd).catch(function (error) {
    console.log('error using nfcall:', error);
});

/* fcall turns any function into a promise. */
q.fcall(add, 1, 2, 3).then(function (sum) {
    console.log('sum using fcall:', sum);
});
