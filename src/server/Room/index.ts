import * as socket from 'socket.io';
import {Lobby} from '@/Lobby';
import {SocketEvents as SE} from 'types/socketEvents';
import {SocketRooms as SR} from 'types/socketRooms';

// import {Adapter} from 'socket.io';

export type SocketRooms = SocketIO.Adapter['rooms'];

export class Room {
  private static io: SocketIO.Namespace;
  private static counter: number = 0;
  private static rooms: SocketRooms;
  // private static roomClient: SocketIO.Adapter['sids'];
  static readonly roomPrefix: string = 'KomersantRoom';

  static initRoom(io: SocketIO.Namespace) {
    // Room.roomClient = io.adapter.sids;
    Room.io = io;
    Room.rooms = io.adapter.rooms;
  }

  static initEvents(socket: SocketIO.Socket) {
    socket.on(SE.join_room, (id: number, done: (id: number) => void) => {
      done(Room.joinRoom(socket, id));
    });
    socket.on(SE.leave_room, () => Room.leaveRoom(socket));
  }

  static joinRoom(socket: SocketIO.Socket, id: number) {
    // have to join to lobby - first check if exists
    if(id !== -1 && !Room.rooms[`${Room.roomPrefix}${id}`]) {
      return -1;
    }
    // have to create lobby - set new id
    if(id === -1) {
      id = ++Room.counter;
    }
    socket.join(`${Room.roomPrefix}${id}`)
    Room.io.to(SR.lobby).emit(SE.update_lobby, Lobby.rooms);
    return id;
    // TODO: is already in some room?
    // TODO: lobby full?
  }

  static leaveRoom(socket: SocketIO.Socket) {
    const id = Object.getOwnPropertyNames(socket.rooms).filter(roomId => roomId.indexOf(`${Room.roomPrefix}`) !== -1);
    if(id.length !== 1) {
      throw new Error(`Room count inconsistent!`);
    }
    socket.leave(`${id[0]}`);
    Room.io.to(SR.lobby).emit(SE.update_lobby, Lobby.rooms);
  }

}
