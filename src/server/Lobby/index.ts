import * as socket from 'socket.io';
import {SocketEvents} from '@/Socket';
export class Lobby {
  private static io: SocketIO.Server;

  static init(io: SocketIO.Server) {
    Lobby.io = io;
  }

  static get rooms() {
    if(!Lobby.io) {
      throw Error('Lobby is not initialized');
    }

    return Object.keys(Lobby.io.sockets.adapter.rooms)
      .filter((key) => key.indexOf('Lobby') !== -1);
  }
}
