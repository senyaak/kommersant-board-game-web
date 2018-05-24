import * as socket from 'socket.io';
import {Lobby} from '@/Lobby';

export default class Client {
  private static stack: Client[] = [];
  constructor(private socket: SocketIO.Socket) {
    // Init io initEvents
    // Global:
    socket.on('disconnect', () => {
      Client.stack.splice(Client.stack.indexOf(this), 1);
    });
    // Lobby:
    Lobby.initEvents(socket);

    Client.stack.push(this);

    // FIXME remove unused room
    socket.join("test_room");

  }
}
