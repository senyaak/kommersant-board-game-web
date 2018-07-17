import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '#/Home';
import Lobby from '#/Lobby';
import Room from '#/Lobby/Room';

import {SocketEvents} from 'types/socketEvents';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/lobby',
      name: 'LobbyList',
      component: Lobby,
    }, {
      path: '/room/:id',
      name: 'Room',
      component: Room,
    }
      // meta: {
      //   requiredAuth: true
      // }
    // }, {
    //   path: '/login',
    //   name: 'Authentication',
    //   component: Authentication,
    // }
  ]
});


// LOADING state
router.beforeEach((to, from, next) => {
  try {
    router.app.$data.loading = true;
  } catch(e){}
  next()
});
router.afterEach((to, from) => {
  try {
    router.app.$data.loading = false;
  } catch(e){}
});

export default router;
