import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '#/Home';
import Lobby from '#/Lobby';
// Register components
// Vue.component('Home', Home);

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

// redirect ro login page if not authenticated
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     if (Auth.default.user.authenticated) {
//       next()
//     } else {
//       router.push('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router;
