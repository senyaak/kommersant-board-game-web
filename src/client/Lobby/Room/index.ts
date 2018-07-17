import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
// import axios from 'axios';
import {io} from '#/index';
import {SocketEvents as SE} from 'types/socketEvents';

import template from './room.html';

@Component({
  template: template,
  beforeRouteEnter(to, from, next) {
    io.emit(SE.join_room, parseInt(to.params.id), (id: number) => {
      if(id === -1) {
        // lobby do not exists - abort
        next('/');
      }
      // set correct id in URL
      next((vm) => {
        vm.$router.replace(`/room/${id}`)
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    io.emit(SE.leave_room);
    next();
  },
  beforeMount() {
  },
})
export default class Room extends Vue {
  clients: {id: number, name: string}[] = [];
};
