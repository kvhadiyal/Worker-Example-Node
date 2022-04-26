const http = require('http');
const { Worker } = require('worker_threads');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === '/total') {
        const worker = new Worker('./getCount.js');
        worker.on('message', (message) => {
            console.log('Returning /total results');
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(message);
        });
    } else if (req.url === '/hello') {
        console.log('Returning /hello results');
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(`{"message":"hello"}`);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});