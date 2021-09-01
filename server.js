const http = require('http');
const app = require('./app');
const api = require('./api');

const port = process.env.PORT || 3000;

api.api.set('port', port);
const server = http.createServer(api.api);

server.listen(port);
