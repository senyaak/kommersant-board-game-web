import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

import {io} from '#/index';
import {SocketEvents as SE} from 'types/socketEvents';
import {API} from 'types/api'

import template from './lobby.html';

type RoomList = {name: string; id: number, count: number};

@Component({
  template: template,
  beforeRouteEnter(to, from, next) {
    io.emit(SE.join_lobby, 1);
    next();
  },
  beforeRouteLeave(to, from, next) {
    io.emit(SE.leave_lobby);
    next();
  },
  beforeMount(this: Lobby) {
    this.$router.app.$data.loading = true;
    axios.get(API.lobby).then(({data}) => {
      this.rooms = data;
      this.$router.app.$data.loading = false;
    });
  },
  created(this: Lobby) {
    io.on(SE.update_lobby, this.updateLobby);
  },
})
export default class Lobby extends Vue {
  rooms: RoomList[] = [];
  updateLobby(rooms: RoomList[]) {
    this.rooms = rooms;
  }
};
