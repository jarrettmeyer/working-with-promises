/* This is a demo application being converted from callback-based to promise-based. */

var uuid = require('node-uuid');
var q = require('q');

var data = {
    'alice': { id: uuid.v4(), firstName: 'Alice' },
    'bob': { id: uuid.v4(), firstName: 'Bob' },
    'charlie': { id: uuid.v4(), firstName: 'Charlie' },
    'diane': { id: uuid.v4(), firstName: 'Diane' }
}

function getData(key, callback) {
    var row = data[key];
    if (row) {
        return setImmediate(function () {
            return callback(null, row);
        });
    } else {
        return setImmediate(function () {
            var err = 'Key not found: ' + key;
            return callback(err, null);
        });
    }
}

q.nfcall(getData, 'bob').then(function (result) {
    console.log('bob:', result);
});

q.nfcall(getData, 'mike').catch(function (error) {
    console.log('mike:', error);
});

q.nfcall(getData, 'diane').then(function (error) {
    console.log('diane:', error);
});

q.nfcall(getData, 'jack').catch(function (error) {
    console.log('mike:', error);
});
