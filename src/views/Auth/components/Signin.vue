<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.prevent="handleSubmit(onSubmit)">
        <!-- Header -->
        <div class="mb-10 pt-lg-0 pt-5 text-center">
          <!-- <img height="72" class="mb-8" src="/media/logo-dark.png" alt="" /> -->
          <!-- <img
            height="38"
            class="d-block d-lg-none mb-8"
            src="/media/logo/logo-horizontal-dark.png"
            alt=""
          /> -->
          <h3 class="font-weight-bolder text-dark font-size-h3 font-size-h2-lg">
            Content Management System
          </h3>
          <span
            class="text-dark-50 font-weight-bold font-size-h5 font-size-h4-lg"
          >
            Please sign in to continue
          </span>
        </div>
        <!-- Header End -->

        <!-- Alerts -->
        <transition
          name="component-fade"
          enter-active-class="animate__animated animate__faster animate__fadeIn"
          leave-active-class="animate__animated animate__faster animate__fadeOut"
          mode="out-in"
        >
          <div
            v-if="failed"
            :key="1"
            class="alert alert-custom alert-notice alert-light-danger fade show mb-7"
            role="alert"
          >
            <div class="alert-text">
              Email address or Password are Incorrect
            </div>
          </div>
          <div
            v-else-if="success"
            :key="2"
            class="alert alert-custom alert-notice alert-light-primary fade show mb-7"
            role="alert"
          >
            <div class="alert-text">
              Welcome, you'll be redirected soon..
            </div>
          </div>
        </transition>
        <!-- Alerts End-->

        <!-- Inputs -->
        <!-- Email -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Email Address"
            rules="required|email"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Email address
            </label>
            <input
              v-model="email"
              :class="classes"
              type="email"
              :disabled="loading"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- Password -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Password"
            rules="required"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Password
            </label>
            <input
              v-model="password"
              :class="classes"
              type="password"
              :disabled="loading"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- Inputs End -->

        <!-- Footer -->
        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <!-- <a
            id="kt_login_forgot"
            href="javascript:;"
            class="text-primary font-size-h5 font-weight-bolder"
            @click="$emit('changePage', 'forgot-password')"
          >
            Forgot Password ?
          </a> -->
          <button
            id="kt_login_signin_submit"
            type="submit"
            class="btn btn-primary btn-block font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
            style="min-width: 120px; min-height: 50px;"
          >
            <div v-if="!loading">
              <span>Sign In</span>
            </div>
            <div
              class="d-flex align-items-center justify-content-center"
              v-else
            >
              <span
                class="spinner spinner-track spinner-primary spinner-sm mr-6"
              ></span>
              <span class="ml-2">Loading...</span>
            </div>
          </button>
        </div>
        <!-- <div class="text-center mb-8">
          <p class="text-dark font-size-h5 font-weight-bolder">
            Don't have account yet ?
            <a
              href="javascript:;"
              @click="$emit('changePage', 'signup')"
              class="text-primary"
            >
              Request Here
            </a>
          </p>
        </div> -->

        <!-- Footer End -->
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInterface } from '@/interfaces/user.js';
import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import '@/assets/sass/pages/auth/auth.scss';
extend('email', email);
extend('required', required);

@Component({
  components: {}
})
export default class Signin extends Vue {
  failed = false;
  loading = false;
  success = false;
  email = '';
  password = '';

  get userInfo(): UserInterface {
    return this.$store.getters['user/user_info'];
  }

  get loginStatus(): boolean {
    return this.$store.getters['user/login_status'];
  }

  onSubmit(): void {
    this.failed = false;
    this.loading = true;
    this.success = false;
    this.$store
      .dispatch('user/SIGN_IN', {
        email: this.email,
        password: this.password
      })
      .then((data) => {
        this.failed = false;
        this.success = true;
        setTimeout(() => {
          this.$store.dispatch('user/SUCCESS_LOGIN', data.data.data);
          this.$router.push('posts');
        }, 2000);
      })
      .catch(() => {
        this.failed = true;
        this.loading = false;
      });
  }
}
</script>
