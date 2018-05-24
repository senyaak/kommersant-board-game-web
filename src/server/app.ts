import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socket from 'socket.io';

import {initSocket} from '@/Socket';
import router from '@/Routes';

const config = require('config/config.json');
export const root = path.resolve(__dirname, '..', '..');

/* Create server */
export const app = router(express(), root);

/* start server */
const server = app.listen(config.port, config.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
  initSocket(server);
});
