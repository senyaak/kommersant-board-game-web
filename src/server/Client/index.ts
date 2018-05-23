import * as socket from 'socket.io';

export default class Client {
  private static stack: Client[] = [];
  constructor(private socket: SocketIO.Socket) {
    Client.stack.push(this);

    // FIXME remove unused room
    socket.join("test_room");

    socket.on('disconnect', () => {
      Client.stack.splice(Client.stack.indexOf(this), 1);
    });
  }
}
