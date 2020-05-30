//Create Server at Port 3010 
const PORT = 3010;
const app = require('./app');
const http = require('http');

let server = http.createServer(app);

server.listen(PORT, () => {console.log('server is active at Port 3010')})