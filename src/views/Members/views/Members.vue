<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Panel title="Data member" subtitle="Dibawah ini adalah daftar member">
          <template v-slot:toolbar>
            <button
              v-b-modal.modal-filter
              class="btn btn-sm btn-primary mr-4 font-weight-bolder"
            >
              <i class="fa fa-filter"></i>
              Filter Data
            </button>
            <router-link :to="'informasi/'" class="btn btn-sm btn-success">
              <span class="d-flex align-items-center font-weight-bolder">
                <i class="fas fa-user-plus mb-0 mr-1"></i>
                Member baru
              </span>
            </router-link>
          </template>
          <template v-slot:body>
            <table class="table table-striped">
              <thead class="bg-dark text-white">
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Cabang</th>
                  <th>Wilayah</th>
                  <th>Email</th>
                  <th class="text-center">Active</th>
                  <th class="text-center">Status</th>
                  <th class="text-center" width="5%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>mbadar6398</td>
                  <td>Muhammad Badar</td>
                  <td>KCP Proklamasi</td>
                  <td>Kota Depok</td>
                  <td>mbadar6398@gmail.com</td>
                  <td class="text-center">
                    <span class="badge badge-primary">Active</span>
                  </td>
                  <td class="text-center">
                    <span class="badge badge-warning">Pending</span>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-sm btn-transparent text-dark text-hover-primary p-0 m-0"
                    >
                      <i class="fa fa-ellipsis-v p-0"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </Panel>
        <FilterMemberModal />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import FilterMemberModal from '../components/FilterMemberModal.vue';
@Component({
  components: { Panel, FilterMemberModal }
})
export default class Members extends Vue {}
</script>
