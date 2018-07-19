import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
// import axios from 'axios';
import {io} from '#/index';
import {SocketEvents as SE} from 'types/socketEvents';
import {JoinResult} from '@/Room';

import template from './room.html';

@Component({
  template: template,
  beforeRouteEnter(to, from, next) {
    io.emit(SE.join_room, parseInt(to.params.id), ({id, playerList}: JoinResult) => {
      if(id === -1) {
        // lobby do not exists - abort
        next('/');
      } else {
        // set correct id in URL
        next((component) => {
          component.$router.replace(`/room/${id}`);
          // playerList
          (<Room>component).updateList(playerList!);
        });
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    io.emit(SE.leave_room);
    next();
  },

  created(this: Room) {
    console.log('created')
    io.on(SE.update_lobby, this.updateList);
  },
  destroyed(this: Room) {
    console.log('destroyed')
    io.removeListener(SE.update_lobby, this.updateList);
  },
})
export default class Room extends Vue {
  players: string[] = [];
  updateList(list: string[]) {
    console.log('updateLists', list)
    this.players = list!.map((player) => {
      return player === io.id? 'player': player.replace('/lobby', '');
    });
  }
};
