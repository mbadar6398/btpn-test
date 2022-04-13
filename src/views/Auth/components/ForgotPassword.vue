<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.prevent="handleSubmit(onSubmit)">
        <!-- Header -->
        <div class="pb-13 pt-lg-0 pt-5">
          <img
            height="72"
            class="d-none d-lg-block mb-8"
            src="/media/logo/automate-logo-only.png"
            alt=""
          />
          <img
            height="38"
            class="d-block d-lg-none mb-8"
            src="/media/logo/logo-horizontal-dark.png"
            alt=""
          />
          <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
            Forgot your password?
          </h3>
          <span class="text-dark-50 font-weight-bold font-size-h5">
            Don't worry, please tell us your email address first. we'll send you
            a link to reset your password
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
            <div class="alert-text">Email address is not registered yet</div>
          </div>
          <div
            v-else-if="success"
            :key="2"
            class="alert alert-custom alert-notice alert-light-primary fade show mb-7"
            role="alert"
          >
            <div class="alert-text">
              Success request change password, Please check your email to change
              password
            </div>
          </div>
        </transition>
        <!-- Alerts End-->

        <!-- Inputs -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Email Address"
            rules="required|email"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Email Address
            </label>
            <input
              v-model="email"
              :class="classes"
              :disabled="loading"
              type="email"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- Inputs end -->

        <!-- Footer -->
        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <a
            id="kt_login_forgot"
            href="javascript:;"
            class="text-danger font-size-h6 font-weight-bolder text-hover-danger"
            @click="$emit('changePage', 'signin')"
          >
            <i class="fa fa-chevron-left text-danger mr-2"></i>
            Back
          </a>
          <button
            id="kt_login_signin_submit"
            type="submit"
            class="btn btn-danger font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
            style="min-width: 120px; min-height: 50px;"
          >
            <span v-if="!loading">
              <i class="fa fa-lock mr-2"></i>
              Reset Password
            </span>
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
import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import '@/assets/sass/pages/auth/auth.scss';
extend('email', email);
extend('required', required);

@Component({
  components: {}
})
export default class ForgotPassword extends Vue {
  email = '';
  failed = false;
  loading = false;
  success = false;
  onSubmit(): void {
    this.failed = false;
    this.loading = true;
    this.success = false;
    this.$store
      .dispatch('user/FORGOT_PASSWORD', {
        email: this.email
      })
      .then((resp) => {
        this.success = true;
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
