import * as socket from 'socket.io';
import * as express from 'express';

import Client from '@/Client';
import {Lobby} from '@/Lobby';

export enum SocketEvents {
  join_lobby = 'join_lobby',
}

export function initSocket(server) {
  const io: SocketIO.Server = socket(server);

  init(io);
  Lobby.init(io);
  return io;
}

function init(io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    new Client(socket);
  });
}
