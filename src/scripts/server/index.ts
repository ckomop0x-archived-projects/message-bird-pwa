import * as bodyParser from 'body-parser';
import * as express from 'express';
const cors = require('cors');
const path = require('path');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const urlencodedParser = bodyParser.urlencoded({extended: false});
import WebHooksServer from './server';

const webHookServer = new WebHooksServer();
const app = webHookServer.getApp();

app.post('/webhook', urlencodedParser, (request, response) => {
    if (!request.body) {
        return response.sendStatus(400);
    }

    webHookServer.sendMessage('newmessage');
    return response.sendStatus(200);
});

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', cors(corsOptions), (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

export {app};
