import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes.js';

const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log(`Port ${port} is listen...`);
});