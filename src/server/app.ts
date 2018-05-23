import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socket from 'socket.io';

const config = require('config/config.json');

import {initSocket} from '@/Socket';
import {Lobby} from '@/Lobby';

/* Create server */
export const app = express();

export const root = __dirname + '/../..';

// routing
app.use('/', express.static(path.resolve(root, 'dist', 'public')));
app.get('/lobby', (req: express.Request, res: express.Response) => {
  console.log(Lobby.rooms)
  res.send(Lobby.rooms);
});
/* start server */
const server = app.listen(config.port, config.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
});

initSocket(server);
