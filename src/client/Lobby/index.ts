import Vue from "vue";
import Component from "vue-class-component";

import template from './lobby.html';

@Component({
  template: template,
})
export default class Lobby extends Vue {
  rooms: {id: number, count: number}[] = [];

  beforeMount() {
    // TODO: Get rooms
    this.rooms = [{id: 1, count: 0}];
  }
};
