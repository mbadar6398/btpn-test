<template>
  <div id="app" class="page h-100">
    <router-view />
  </div>
</template>

<style lang="scss">
// 3rd party plugins css
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import './assets/sass/style.vue';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class App extends Vue {}
</script>
