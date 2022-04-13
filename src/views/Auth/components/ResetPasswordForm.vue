<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.prevent="handleSubmit(onSubmit)">
        <!-- Header -->
        <div class="mb-7 pt-lg-0 pt-5">
          <img
            height="72"
            class="d-none d-lg-block mb-8"
            src="/media/logo/automate-logo-only.png"
            alt=""
          />
          <img
            height="38"
            class="d-block d-md-none mb-8"
            src="/media/logo/logo-horizontal-dark.png"
            alt=""
          />
          <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
            Reset Password
          </h3>
          <span
            class="text-dark-50 font-weight-bold font-size-h5 font-size-h5-lg"
          >
            Please fill fields below to reset your password
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
            class="alert alert-custom alert-notice alert-light-warning fade show mb-7"
            role="alert"
          >
            <div class="alert-text">Email address or Password is Incorrect</div>
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
              New password
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
              Re-type new password
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
          <router-link
            id="kt_login_forgot"
            to="/"
            class="text-primary font-size-h6 font-weight-bolder text-hover-primary"
          >
            <i class="fa fa-chevron-left mr-2 text-primary"></i>
            Back to Sign in
          </router-link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            class="btn btn-danger font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
            style="min-width: 120px; min-height: 50px;"
          >
            <span v-if="!loading">Reset Password</span>
            <span
              v-else
              class="spinner spinner-track spinner-danger spinner-lg mr-6"
            ></span>
          </button>
        </div>

        <!-- Footer End -->
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createHelpers } from 'vuex-map-fields';
import { UserInterface } from '@/interfaces/user';
import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import '@/assets/sass/pages/auth/auth.scss';
extend('email', email);
extend('required', required);

const { mapFields } = createHelpers({
  getterType: 'user/GET_FIELDS',
  mutationType: 'user/UPDATE_FIELDS'
});

@Component({
  components: {},
  computed: {
    ...mapFields({
      userInfo: 'userInfo'
    })
  }
})
export default class ResetPasswordForm extends Vue {
  userInfo!: UserInterface;
  failed = false;
  loading = false;
  success = false;
  email = '';
  password = '';
  onSubmit(): void {
    this.failed = false;
    this.loading = true;
    this.success = false;
    this.$store
      .dispatch('user/SIGN_IN', {
        username: this.email,
        password: this.password
      })
      .then((resp) => {
        this.failed = false;
        this.success = true;
        const data = resp.data.data;
        this.userInfo = data;
      })
      .catch(() => {
        this.failed = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
