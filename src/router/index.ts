import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NotFound from '../views/NotFound/pages/NotFound.vue';
import Auth from '../views/Auth/pages/Auth.vue';
import Posts from '../views/Posts/pages/Posts.vue';
import PostsCreate from '../views/Posts/pages/PostsCreate.vue';
import PostsDetail from '../views/Posts/pages/PostsDetail.vue';
import GeneralSettings from '../views/Settings/pages/General.vue';
import SmtpSettings from '../views/Settings/pages/Smtp.vue';
import TemplateSettings from '../views/Settings/pages/Template.vue';
import PasswordSettings from '../views/Settings/pages/Password.vue';
import SocialMediaSettings from '../views/Settings/pages/SocialMedia.vue';

// Menu
import Menu from '@/views/Menu/pages/Menu.vue';

// Informasi
import Informasi from '@/views/Custom/Informasi/views/Informasi.vue';
import Regulasi from '@/views/Custom/Regulasi/views/Regulasi.vue';
import RegulasiDetail from '@/views/Custom/Regulasi/views/RegulasiDetail.vue';
import InformasiDetail from '@/views/Custom/Informasi/views/InformasiDetail.vue';
import KepesertaanAdd from '@/views/Custom/Informasi/views/KepesertaanAdd.vue';
import KepesertaanDetail from '@/views/Custom/Informasi/views/KepesertaanDetail.vue';

// Pages
import Pages from '@/views/Pages/views/Pages.vue';
import PagesDetail from '@/views/Pages/views/PagesDetail.vue';

// Members
import Members from '@/views/Members/views/Members.vue';
import MembersAdd from '@/views/Members/views/MembersAdd.vue';

import store from '../store/index';

Vue.use(VueRouter);

const isAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters['user/LOGIN_STATUS']) {
    return next();
  }
  return next('/');
};

const isNotAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters['user/LOGIN_STATUS']) {
    return next('/posts');
  } else {
    return next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    beforeEnter: isAuthenticated
  },
  {
    path: '404',
    name: 'NotFound',
    component: NotFound,
    beforeEnter: isAuthenticated
  },
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    beforeEnter: isAuthenticated
  },
  {
    path: '/posts/create',
    name: 'PostsCreate',
    component: PostsCreate,
    beforeEnter: isAuthenticated
  },
  {
    path: '/posts/get/:id',
    name: 'PostsDetail',
    component: PostsDetail,
    beforeEnter: isAuthenticated
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    beforeEnter: isAuthenticated
  },
  {
    path: '/pages',
    name: 'pages',
    component: Pages,
    beforeEnter: isAuthenticated
  },
  {
    path: '/pages/detail/:id',
    name: 'PagesDetail',
    component: PagesDetail,
    beforeEnter: isAuthenticated
  },
  {
    path: '/members',
    name: 'Members',
    component: Members,
    beforeEnter: isAuthenticated
  },
  {
    path: '/members/add',
    name: 'MembersAdd',
    component: MembersAdd,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings/general',
    name: 'general-settings',
    component: GeneralSettings,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings/smtp',
    name: 'smtp-settings',
    component: SmtpSettings,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings/template',
    name: 'smtp-template',
    component: TemplateSettings,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings/social-media',
    name: 'social-media-settings',
    component: SocialMediaSettings,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings/password',
    name: 'passwordl-settings',
    component: PasswordSettings,
    beforeEnter: isAuthenticated
  },
  {
    path: '/informasi',
    name: 'informasi',
    component: Informasi,
    beforeEnter: isAuthenticated
  },
  {
    path: '/informasi/keuangan/detail/:id',
    name: 'detail-informasi',
    component: InformasiDetail,
    beforeEnter: isAuthenticated
  },
  {
    path: '/informasi/investasi/detail/:id',
    name: 'detail-informasi',
    component: InformasiDetail,
    beforeEnter: isAuthenticated
  },
  {
    path: '/informasi/kepesertaan/add',
    name: 'add-informasi-kepesertaan',
    component: KepesertaanAdd,
    beforeEnter: isAuthenticated
  },
  {
    path: '/informasi/kepesertaan/detail/:id',
    name: 'detail-informasi-kepesertaan',
    component: KepesertaanDetail,
    beforeEnter: isAuthenticated
  },
  {
    path: '/regulasi',
    name: 'regulasi',
    component: Regulasi,
    beforeEnter: isAuthenticated
  },
  {
    path: '/regulasi/detail/:id',
    name: 'regulasi-detail',
    component: RegulasiDetail,
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
