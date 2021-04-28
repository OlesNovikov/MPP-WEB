// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { router } from './routes.js';
// import { connectWs } from './websockets/sockets.js';

// const app = express();
// const port = 1234;

// connectWs();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(router);

// app.listen(port, () => {
//     console.log(`Port ${port} is listen...`);
// });

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './routes.js';
import WebSocket from 'ws';
import http from 'http';
import { connectWs } from './websockets/sockets.js';

const port = 1234;
const app = express();
const server = http.createServer(app);
export const webSocketServer = new WebSocket.Server({ server: server });

app.use(cors());
app.use(bodyParser.json());
app.use(router);

connectWs();

server.listen(port, () => {
    console.log(`Port ${port} is listen...`);
});