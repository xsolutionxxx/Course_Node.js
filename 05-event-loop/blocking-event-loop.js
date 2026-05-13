let isRunning = true;

setTimeout(() => {
    isRunning = false;
}, 10);

process.nextTick(() => {
    console.log("Next Tick inside while loop");
});

while (isRunning) {
    console.log("While loop is blocking the event loop");
}
