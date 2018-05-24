import * as express from 'express';
import * as path from 'path';

import {API} from 'types/api';

import {Lobby} from '@/Lobby';


export default function(app: express.Express, root: string) {
  app.use(API.index, express.static(path.resolve(root, 'dist', 'public')));
  app.get(API.lobby, (req: express.Request, res: express.Response) => {
    res.send(Lobby.rooms);
  });
  return app;
}
