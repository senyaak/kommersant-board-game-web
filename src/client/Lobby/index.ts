import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

import {io} from '#/index';
import {SocketEvents as SE} from 'types/socketEvents';
import {API} from 'types/api'

import template from './lobby.html';

@Component({
  template: template,
})
export default class Lobby extends Vue {
  rooms: {id: number, count: number}[] = [];

  beforeMount() {
    axios.get(API.lobby).then(({data}) => {
      // TODO: transform rooms? assign to rooms;
      this.rooms = data;
    });
  }
};
