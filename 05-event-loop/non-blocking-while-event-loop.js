let isRunning = true;

setTimeout(() => {
    isRunning = false;
}, 0);

process.nextTick(() => {
    console.log("Next Tick inside while loop");
});

function setImmediatepromise() {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve("Set Immediate Promise Resolved");
        });

        // with resolve() we stay on the same tick and we will never get to the setImmediate callback, so we will never exit the while loop
        // resolve();
    });
}

async function whileLoop() {
    while (isRunning) {
        console.log("While loop is running...");
        await setImmediatepromise();
    }
}

whileLoop().then(() => {
    console.log("While loop has finished");
});
