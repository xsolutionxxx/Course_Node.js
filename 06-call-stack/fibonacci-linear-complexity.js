// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

function info(text) {
    console.log(text, performance.now().toFixed(3));
}

info("Program started");

setTimeout(() => {
    info("Timer");
}, 0);

function fibonacci(n) {
    if (n === 0 || n === 1) {
        return n;
    }

    let a = 0;
    let b = 1;
    let temp;

    for (let i = 1; i < n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }

    return temp;
}

console.log(fibonacci(1000));

info("Program ended");
