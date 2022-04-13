import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import posts from './modules/posts';
import contact from './modules/contact';
import summary from './modules/summary';
import pages from './modules/pages';
import sections from './modules/sections';
import member from './modules/member';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    contact,
    summary,
    posts,
    pages,
    sections,
    member
  },
  strict: debug,
  plugins: [
    createPersistedState({
      key: 'automate',
      reducer: (state: any) => ({
        user: state.user
      })
    })
  ]
});
