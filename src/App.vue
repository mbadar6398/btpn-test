<template>
  <div id="app" class="page h-100">
    <div v-if="loginStatus" class="page__container">
      <Sidebar />
      <div class="page__content">
        <Headbar />
        <div
          :class="
            `content ${
              currentMenu === 'Message' || currentMenu === 'Story Detail'
                ? 'py-0'
                : ''
            }`
          "
        >
          <router-view />
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<style lang="scss">
// 3rd party plugins css
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~socicon/css/socicon.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
@import '~line-awesome/dist/line-awesome/css/line-awesome.css';
@import './assets/icons/flaticon/flaticon.css';
@import './assets/icons/flaticon2/flaticon.css';
@import './assets/icons/keenthemes-icons/font/ki.css';

// Main demo style scss
@import './assets/sass/style.vue';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Headbar from '@/layouts/Headbar.vue';
import Sidebar from '@/layouts/Sidebar.vue';

@Component({
  components: {
    Headbar,
    Sidebar
  }
})
export default class App extends Vue {
  get loginStatus() {
    return this.$store.getters['user/LOGIN_STATUS'];
  }
  get currentMenu() {
    return this.$route.name;
  }
}
</script>
