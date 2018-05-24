import * as socket from 'socket.io';
import {SocketEvents as SE} from 'types/socketEvents';
export class Lobby {
  private static io: SocketIO.Server;

  static initLobby(io: SocketIO.Server) {
    Lobby.io = io;
  }

  static initEvents(socket: SocketIO.Socket) {
    socket.on(SE.join_lobby,() => Lobby.joinLobby(socket));
    socket.on(SE.leave_lobby,() => Lobby.leaveLobby(socket));
  }

  static get rooms() {
    if(!Lobby.io) {
      throw Error('Lobby is not initialized');
    }

    return Object.keys(Lobby.io.sockets.adapter.rooms)
      .filter((key) => key.indexOf('Room') !== -1);
  }

  static joinLobby(socket: SocketIO.Socket) {
    socket.join('lobby');
  }

  static leaveLobby(socket: SocketIO.Socket) {
    socket.leave('lobby');
  }
}
