import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Auth from '../views/Auth/pages/Auth.vue';
import Home from '../views/Home/pages/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const isAuthenticated = (_to: any, _from: any, next: any) => {
  if (store.getters['user/TOKEN']) {
    return next();
  }
  return next('/');
};

const isNotAuthenticated = (_to: any, _from: any, next: any) => {
  if (store.getters['user/TOKEN']) {
    return next('/home');
  } else {
    return next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
