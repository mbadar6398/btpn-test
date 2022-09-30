<template>
  <div class="container-fluid h-100 p-0">
    <div class="row no-gutters h-100">
      <div class="col-12 bg-white">
        <div
          class="d-flex flex-column justify-content-center align-items-center h-100 position-relative p-12"
        >
          <div class="row no-gutters justify-content-center w-100">
            <div class="col-12 col-md-8 col-xl-4">
              <transition
                name="component-fade"
                enter-active-class="animate__animated animate__faster animate__fadeIn"
                leave-active-class="animate__animated animate__faster animate__fadeOut"
                mode="out-in"
              >
                <Signin />
              </transition>
            </div>
            <div class="col-12">
              <div class="text-center">
                <p class="text-dark-50 font-weight-bolder mb-0">
                  © 2022, Muhammad Badar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '@/assets/sass/pages/auth/auth.scss';
import Signin from '../components/Signin.vue';

@Component({
  components: {
    Signin
  }
})
export default class Auth extends Vue {}
</script>
