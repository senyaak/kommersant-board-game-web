import * as socket from 'socket.io-client';
import Vue from 'vue';
import * as vuetify from 'vuetify';
Vue.use(<any>vuetify);
import "root/node_modules/vuetify/dist/vuetify.min.css";
Vue.config.productionTip = false;

import Router from '#/router';

socket();

let app = new Vue({
  router: Router,
  template: `
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>`,
  el: 'root',
  components: {
  },
});
