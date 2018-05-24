import Vue from 'vue';
import Component from 'vue-class-component';
// import axios from 'axios';

import template from './room.html';

@Component({
  template: template,
})
export default class Lobby extends Vue {
  clients: {id: number, name: string}[] = [];
  beforeMount() {
    // TODO: join/create room

  }
};
