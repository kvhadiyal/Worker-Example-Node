const { parentPort } = require('worker_threads');
const slowFunction = () => {
    let counter = 0;
    while (counter < 7500000000) {
        counter++;
    }

    return counter;
};
let slowResult = slowFunction();
let message = `{"totalCount":${slowResult}}`;
parentPort.postMessage(message);