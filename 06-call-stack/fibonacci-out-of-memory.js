// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

setTimeout(() => {
    console.log("Timer");
}, 0);

function fibonacci(n) {
    return new Promise((resolve, reject) => {
        if (n === 0 || n === 1) {
            return resolve(n);
        }
        setImmediate(() => {
            Promise.all([fibonacci(n - 1), fibonacci(n - 2)])
                .then(([result1, result2]) => resolve(result1 + result2))
                .catch(reject);
        });
    });
}

// Heap out of memory error for n = ~50
fibonacci(50).then((result) => {
    console.log(result);
});
