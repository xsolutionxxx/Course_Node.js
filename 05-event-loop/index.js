const fs = require("fs");
const dns = require("dns");

function info(text) {
    console.log(text, performance.now().toFixed(3));
}

console.log("Program started");

// Close events
fs.writeFile("./05-event-loop/test.txt", "Hello, World!", () =>
    info("File written"),
);

// Promises
Promise.resolve("Promise 1").then((result) => info(result));

// Next Tick
process.nextTick(() => {
    info("Next Tick 1");
});

// setImmediate (Check)
setImmediate(() => info("Immediate 1"));

// Intervals
let intervalCount = 0;

const intervalId = setInterval(() => {
    info(`Interval ${(intervalCount += 1)}`);
    if (intervalCount === 2) {
        clearInterval(intervalId);
    }
}, 10);

// Timeouts
setTimeout(() => {
    info("Timeout 1");
}, 0);
setTimeout(() => {
    process.nextTick(() => {
        info("Next Tick 2 inside Timeout 2");
    });
    info("Timeout 2");
}, 10);

// I/O events
dns.lookup("localhost", (err, address, family) => {
    info("DNS 1 localhost", address);
    Promise.resolve("Promise 2 inside DNS 1").then((result) => info(result));
    process.nextTick(() => {
        info("Next Tick 3 inside DNS 1");
    });
});

console.log("Program ended");
