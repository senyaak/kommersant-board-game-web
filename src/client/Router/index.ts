import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '#/Home';
import Lobby from '#/Lobby';

import {io} from '#/index';
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

// join lobby
router.beforeEach((to, from, next) => {
  if (to.path === '/lobby') {
    io.emit(SocketEvents.join_lobby);
  } else if(from.path === '/lobby') {
    io.emit(SocketEvents.leave_lobby);
  }
  next();
});

export default router;
