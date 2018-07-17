import * as socket from 'socket.io';
import * as express from 'express';

import {SocketEvents as SE} from 'types/socketEvents';

import {Lobby} from '@/Lobby';
import {Room} from '@/Room';

export function initSocket(server) {
  const io: SocketIO.Namespace = socket(server).of('lobby');

  init(io);
  Lobby.initLobby(io);
  Room.initRoom(io);
  return io;
}

function init(io: SocketIO.Namespace) {
  io.on(SE.connection, (socket: SocketIO.Socket) => {
    // Initialize events:
    Lobby.initEvents(socket);
    Room.initEvents(socket);
  });
}
