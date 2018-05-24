import * as socket from 'socket.io';
import * as express from 'express';

import {SocketEvents as SE} from 'types/socketEvents';

import Client from '@/Client';
import {Lobby} from '@/Lobby';

export function initSocket(server) {
  const io: SocketIO.Server = socket(server);

  init(io);
  Lobby.initLobby(io);
  return io;
}

function init(io: SocketIO.Server) {
  io.on(SE.connection, (socket: SocketIO.Socket) => {
    new Client(socket);
  });
}
