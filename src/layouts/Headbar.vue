<template>
  <div class="headbar">
    <ul class="headbar__menu">
      <!-- <li class="headbar__menu__item mr-8">
        <p class="font-weight-bold mb-0">Pacakge :</p>
        <h5 class="text-danger font-weight-bolder mt-1 mb-0">
          Free Version
        </h5>
      </li> -->
    </ul>
    <ul class="headbar__menu ml-auto d-flex align-items-center">
      <li class="headbar__menu__item mr-8 d-flex align-items-center">
        <!-- <span class="font-weight-bold mb-0 mr-4">
          {{ online_activity ? 'Online' : 'Offline' }}
        </span> -->
        <!-- <span class="switch switch-sm switch-primary switch-outline">
          <label>
            <input
              v-model="online_activity"
              type="checkbox"
              name="select"
              @change="showOnlineStatus"
            />
            <span></span>
          </label>
        </span> -->
      </li>
      <li class="headbar__menu__item">
        <div
          id="kt_quick_user_toggle"
          class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg"
          @click.prevent="toggleProfileVisibility"
        >
          <div class="symbol symbol-circle symbol-40">
            <img
              alt="Pic"
              :src="settings.logo_dark"
              height="25"
              width="25"
              style="object-fit: contain;"
            />
          </div>
        </div>
        <transition
          name="component-fade"
          enter-active-class="animate__animated animate__faster animate__fadeInUp"
          leave-active-class="animate__animated animate__faster animate__fadeOut"
          mode="out-in"
        >
          <ul
            v-if="profileVisiblity"
            v-on-clickaway="toggleProfileVisibility"
            class="headbar__submenu"
          >
            <li class="headbar__submenu__item">
              <div
                class="symbol symbol-circle symbol-50 d-flex align-items-center"
              >
                <img
                  alt="Pic"
                  :src="settings.logo_dark"
                  height="25"
                  width="25"
                  class="mr-4"
                  style="object-fit: contain;"
                />
                <div>
                  <p class="font-weight-bolder mb-2">
                    {{ settings.company_name }}
                  </p>
                  <span
                    class="label label-light-danger font-weight-bolder label-inline mr-2"
                  >
                    Administrator
                  </span>
                </div>
              </div>
            </li>
            <li class="headbar__submenu__item">
              <a
                @click="logout"
                class="headbar__submenu__link text-dark-50 text-hover-primary cursor-pointer"
              >
                <i
                  class="font-size-h3 mr-2 font-weight-bolder la la-power-off"
                ></i>
                Logout
              </a>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
    <notifications group="online_activity" />
    <notifications group="request" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mixin as clickaway } from 'vue-clickaway';
// import { UserInterface } from '@/interfaces/user.ts';

@Component({
  components: {},
  mixins: [clickaway]
})
export default class Headbar extends Vue {
  profileVisiblity = false;
  online_activity = false;

  toggleProfileVisibility(): void {
    this.profileVisiblity = !this.profileVisiblity;
  }

  logout(): void {
    // this.userInfo = null;
    this.$store.dispatch('user/LOGOUT').then(() => {
      this.$router.push('/');
    });
  }

  get settings() {
    return this.$store.getters['user/SETTINGS'];
  }

  showOnlineStatus(): void {
    if (this.online_activity) {
      this.$notify({
        group: 'online_activity',
        title: 'You are online now',
        type: 'primary',
        text:
          'Welcome back, assignment system will be normal again. This activity will be recorded',
        duration: 5000
      });
    } else {
      this.$notify({
        group: 'online_activity',
        title: 'You are offline now',
        type: 'error',
        text:
          'System will not assign you task at this moment. This activity will be recorded.',
        duration: 5000
      });
    }
  }
}
</script>
