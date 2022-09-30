<template>
  <div
    id="app"
    class="d-flex justify-content-center flex-column align-items-center h-100"
  >
    <div style="width: 50%;" class="text-center">
      <h2>Selamat datang</h2>
      <h1 class="text-primary font-weight-bolder">{{ userInfo.fullname }}</h1>
      <button
        @click="logout"
        class="mt-4 btn btn-danger font-weight-bolder btn-lg"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInterface } from '@/interfaces/user.js';

@Component({
  components: {}
})
export default class Home extends Vue {
  get userInfo(): UserInterface {
    return this.$store.getters['user/USER_INFO'];
  }
  logout(): void {
    this.$store.dispatch('user/LOGOUT');
    this.$router.push('/');
  }
}
</script>
