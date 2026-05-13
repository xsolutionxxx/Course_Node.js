// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

setTimeout(() => {
    console.log("Timer");
}, 0);

const cache = new Map();

function fibonacci(n) {
    return new Promise((resolve, reject) => {
        if (n === 0 || n === 1) {
            return resolve(n);
        }

        if (cache.has(n)) {
            return resolve(cache.get(n));
        }

        setImmediate(() => {
            fibonacci(n - 1).then((result1) => {
                fibonacci(n - 2)
                    .then((result2) => {
                        cache.set(n, result1 + result2);
                        resolve(result1 + result2);
                    })
                    .catch(reject);
                /* Promise.all([fibonacci(n - 1), fibonacci(n - 2)])
        .then(([result1, result2]) => {
          cache.set(n, result1 + result2);
          resolve(result1 + result2);
        
        .catch(reject); */
            });
        });
    });
}

fibonacci(1000).then((result) => {
    console.log(result);
});
