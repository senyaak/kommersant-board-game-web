import * as socket from 'socket.io';
import {SocketEvents as SE} from 'types/socketEvents';
import {SocketRooms as SR} from 'types/socketRooms';
import {Room, SocketRooms} from '@/Room';

export class Lobby {
  private static _rooms: SocketRooms;
  private static io: SocketIO.Namespace;

  static initLobby(io: SocketIO.Namespace) {
    Lobby._rooms = io.adapter.rooms;
    Lobby.io = io;
  }

  static initEvents(socket: SocketIO.Socket) {
    socket.on(SE.join_lobby, () => Lobby.joinLobby(socket));
    socket.on(SE.leave_lobby, () => Lobby.leaveLobby(socket));
    socket.on(SE.disconnect, () => {
      Lobby.io.to(SR.lobby).emit(SE.update_lobby, Lobby.rooms);
    })
  }

  static get rooms() {
    return Object.keys(Lobby._rooms)
      .filter((key) => key.indexOf(Room.roomPrefix) !== -1)
      .map((key) => ({
        name: key,
        count: Lobby._rooms[key].length,
        id: parseInt(key.replace(Room.roomPrefix, ''))
      }));
  }

  static joinLobby(socket: SocketIO.Socket) {
    socket.join(SR.lobby);
  }

  static leaveLobby(socket: SocketIO.Socket) {
    socket.leave(SR.lobby);
  }
}
