export enum SocketEvents {
  // connect
  connection = 'connection',
  disconnect = 'disconnect',
  // lobby
  join_lobby = 'join_lobby',
  leave_lobby = 'leave_lobby',
  update_lobby = 'update_lobby',
  // room
  join_room = 'join_room',
  player_joined = 'player_joined',
  leave_room = 'leave_room',
}
