import * as socket from 'socket.io-client';
import Vue from 'vue';
import * as vuetify from 'vuetify';
Vue.use(<any>vuetify);
import "root/node_modules/vuetify/dist/vuetify.min.css";
Vue.config.productionTip = false;

import Router from '#/Router';

export const io = socket.connect('/lobby');

let app = new Vue({
  router: Router,
  data: {loading: false},
  template: `
  <v-app>
    <v-progress-linear v-show="loading" :indeterminate="true"></v-progress-linear>
    <v-content v-show="!loading">
      <router-view/>
    </v-content>
  </v-app>`,
  el: 'root',
  components: {
  },
});
