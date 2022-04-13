<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.prevent="handleSubmit(onSubmit)">
        <div class="pb-13 pt-lg-0 pt-5">
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
            Request Account
          </h3>
          <span
            class="text-dark-50 font-weight-bold font-size-h5 font-size-h4-lg"
          >
            Please fill fields below to request an account
          </span>
        </div>
        <!-- Alerts -->
        <transition
          name="component-fade"
          enter-active-class="animate__animated animate__faster animate__fadeIn"
          leave-active-class="animate__animated animate__faster animate__fadeOut"
          mode="out-in"
        >
          <div
            v-if="isFailed"
            :key="1"
            class="alert alert-custom alert-notice alert-light-warning fade show mb-7"
            role="alert"
          >
            <div class="alert-text">
              Failed request account, please check again your inputs
            </div>
          </div>
          <div
            v-else-if="isSuccess"
            :key="2"
            class="alert alert-custom alert-notice alert-light-primary fade show mb-7"
            role="alert"
          >
            <div class="alert-text">
              Thank you for requesting account, our marketing will contact you
              soon
            </div>
          </div>
        </transition>
        <!-- Alerts End-->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Email address"
            rules="required|email"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Email address
            </label>
            <input
              v-model="email"
              :class="classes"
              type="email"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="PIC Name"
            rules="required"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              PIC Name
            </label>
            <input
              v-model="name"
              :class="classes"
              type="text"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Company Name"
            rules="required"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Company Name
            </label>
            <input
              v-model="company_name"
              :class="classes"
              type="text"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Mobile Number"
            rules="required"
          >
            <label class="font-size-h6 font-weight-bolder text-dark">
              Mobile Number
            </label>
            <input
              v-model="mobile_no"
              :class="classes"
              type="number"
              class="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
              autocomplete="off"
              required
            />
            <span class="form-error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <a
            id="kt_login_forgot"
            href="javascript:;"
            class="text-primary font-size-h6 font-weight-bolder text-hover-primary"
            @click="$emit('changePage', 'signin')"
          >
            <i class="fa fa-chevron-left text-primary mr-2"></i>
            Back
          </a>
          <button
            id="kt_login_signin_submit"
            type="submit"
            class="btn btn-danger font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
          >
            <i class="far fa-paper-plane text-white mr-2"></i>
            Request Account
          </button>
        </div>
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
export default class Signup extends Vue {
  email = '';
  name = '';
  company_name = '';
  mobile_no = '';
  isSuccess = false;
  isFailed = false;
  onSubmit(): void {
    this.$store
      .dispatch('user/SIGN_UP', {
        email: this.email,
        name: this.name,
        company_name: this.company_name,
        mobile_no: this.mobile_no
      })
      .then(() => {
        this.isFailed = false;
        this.isSuccess = true;
      })
      .catch(() => {
        this.isSuccess = false;
        this.isFailed = true;
      });
  }
}
</script>
