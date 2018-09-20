import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/cpu',
      name: 'cpu',
      component: () => import(/* webpackChunkName: "about" */ './views/Cpu.vue'),
    },
    {
      path: '/mem',
      name: 'mem',
      component: () => import(/* webpackChunkName: "about" */ './views/Memory.vue'),
    },
    {
      path: '/temp',
      name: 'temp',
      component: () => import(/* webpackChunkName: "about" */ './views/Temperature.vue'),
    },
    {
      path: '/storage',
      name: 'storage',
      component: () => import(/* webpackChunkName: "about" */ './views/Storage.vue'),
    },
  ],
});
