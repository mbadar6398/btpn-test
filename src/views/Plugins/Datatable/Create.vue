<template>
  <div class="container">
    <Panel
      title="Datatable"
      subtitle="Dibawah ini adalah daftar table yang telah anda buat"
    >
      <template v-slot:toolbar>
        <b-button variant="primary" class="mr-4" size="sm" v-b-modal.modal-add>
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-list mb-0 mr-1"></i>
            Rows data
          </span>
        </b-button>
        <b-button
          variant="outline-primary"
          class="mr-4"
          size="sm"
          v-b-modal.modal-add
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-code mb-0 mr-1"></i>
            Shortcode
          </span>
        </b-button>
        <b-button variant="outline-primary" size="sm" v-b-modal.modal-add>
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-cog mb-0 mr-1"></i>
            Configuration
          </span>
        </b-button>
      </template>

      <template v-slot:body>
        <table class="table table-striped table-middle">
          <thead class="bg-dark text-white">
            <tr>
              <th>Nama</th>
              <th>Total data</th>
              <th>Created date</th>
              <th>Last Updated</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10" :key="item">
              <td>Data Pesbuker 2021</td>
              <td>Total data</td>
              <td>24/03/2021 12:20:00</td>
              <td>24/03/2021 12:20:00</td>
              <td class="text-center">
                <router-link
                  to="/"
                  class="btn btn-success btn-sm font-weight-bolder"
                >
                  asd
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Panel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '../../../components/panel/Panel.vue';
// import axios from 'axios';

@Component({
  components: { Panel },
  computed: {}
})
export default class DatatableCreate extends Vue {}
</script>

<style>
.table-middle td {
  vertical-align: middle;
}
</style>
