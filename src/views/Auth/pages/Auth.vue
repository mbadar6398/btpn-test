<template>
  <div class="container-fluid h-100 p-0">
    <div class="row no-gutters h-100">
      <!-- <div
        class="d-none d-lg-flex col-12 col-lg-4 position-relative flex-column justify-content-center"
        style="background: #1a1a27;"
      >
        <div class="p-12 text-center">
          <img height="72" src="/media/logo/dpbca.png" alt="" />
          <h5 class="text-primary font-weight-bolder mt-4">
            Tabungan Pensiun Rakyat
          </h5>
        </div>
        <div>
          <img
            style="position: absolute; bottom: 0; object-fit: contain; height: 320px; right: 0;"
            src="/media/svg/illustrations/login-visual-4.svg"
            alt=""
          />
          <img
            style="position: absolute; top: 0; object-fit: contain; height: 320px; left: 0; transform: rotate(180deg);"
            src="/media/svg/illustrations/login-visual-4.svg"
            alt=""
          />
        </div>
      </div> -->
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
                <Signin
                  v-if="currentPage === 'signin'"
                  :key="1"
                  @changePage="changePage"
                />
                <Signup
                  v-else-if="currentPage === 'signup'"
                  :key="2"
                  @changePage="changePage"
                />
                <ForgotPassword v-else :key="3" @changePage="changePage" />
              </transition>
            </div>
            <div class="col-12">
              <div class="text-center">
                <p class="text-dark-50 font-weight-bolder mb-0">
                  © 2022, Bankmas
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
import Signup from '../components/Signup.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

@Component({
  components: {
    Signin,
    Signup,
    ForgotPassword
  }
})
export default class Auth extends Vue {
  currentPage = 'signin';

  changePage(page: string): void {
    this.currentPage = page;
  }
}
</script>
