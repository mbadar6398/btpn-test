<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p class="font-weight-bolder font-size-h5 mb-0 text-primary">
              Detail member
            </p>
            <p>Dibawah ini adalah detail informasi member</p>
          </div>
          <div>
            <ul>
              <li class="d-inline-block mr-2 font-weight-bolder">
                <router-link class="text-dark text-hover-primary" to="/members">
                  Members
                </router-link>
                >
              </li>
              <li class="d-inline-block">Detail Member</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="list-group">
          <div
            class="list-group-item list-group-item-action active font-weight-bolder"
            aria-current="true"
          >
            Daftar Informasi
          </div>
          <button
            @click="currentView = 'akun'"
            type="button"
            class="list-group-item list-group-item-action"
            :class="currentView === 'akun' ? 'bg-darken' : ''"
          >
            Informasi Akun
          </button>
          <button
            @click="currentView = 'personal'"
            :class="currentView === 'personal' ? 'bg-darken' : ''"
            type="button"
            class="list-group-item list-group-item-action"
          >
            Informasi Personal
          </button>
          <button
            @click="currentView = 'kepesertaan'"
            :class="currentView === 'kepesertaan' ? 'bg-darken' : ''"
            type="button"
            class="list-group-item list-group-item-action"
          >
            Informasi Kepesertaan
          </button>
        </div>
      </div>
      <div class="col-9">
        <InformasiAkun v-if="currentView === 'akun'" />
        <InformasiPersonal v-if="currentView === 'personal'" />
        <InformasiKepesertaan v-if="currentView === 'kepesertaan'" />
        <FilterMemberModal />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import FilterMemberModal from '../components/FilterMemberModal.vue';
import InformasiAkun from '../components/InformasiAkun.vue';
import InformasiPersonal from '../components/InformasiPersonal.vue';
import InformasiKepesertaan from '../components/InformasiKepesertaan.vue';
@Component({
  components: {
    Panel,
    FilterMemberModal,
    InformasiAkun,
    InformasiPersonal,
    InformasiKepesertaan
  }
})
export default class MembersDetail extends Vue {
  currentView = 'akun';
}
</script>
