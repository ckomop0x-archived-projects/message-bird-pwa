import WebHooksServer from './server';
import * as bodyParser from 'body-parser';
const cors = require('cors');
const path = require('path');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const urlencodedParser = bodyParser.urlencoded({extended: false});

const webHookServer = new WebHooksServer();
const app = webHookServer.getApp();

app.post('/webhook', urlencodedParser, (request, response) => {
    if (!request.body) {
        return response.sendStatus(400);
    }

    webHookServer.sendMessage('newmessage');
    return response.sendStatus(200);
});

app.get('/', cors(corsOptions), (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

export {app};
