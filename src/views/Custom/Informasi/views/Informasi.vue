<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="list-group">
          <button
            type="button"
            disabled
            class="list-group-item list-group-item-action active font-weight-bolder"
          >
            Category
          </button>
          <button
            type="button"
            @click="selectCategory('kepesertaan')"
            :class="filter.type === 'kepesertaan' ? 'bg-darken' : ''"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            Informasi Kepesertaan
            <span v-b-tooltip.hover title="Public">
              <i class="fa fa-eye text-success"></i>
            </span>
          </button>
          <button
            type="button"
            @click="selectCategory('keuangan')"
            :class="filter.type === 'keuangan' ? 'bg-darken' : ''"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            Informasi Keuangan
            <span v-b-tooltip.hover title="Private">
              <i class="fa fa-eye-slash text-danger"></i>
            </span>
          </button>
          <button
            type="button"
            @click="selectCategory('investasi')"
            :class="filter.type === 'investasi' ? 'bg-darken' : ''"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            Informasi Investasi
            <span v-b-tooltip.hover title="Private">
              <i class="fa fa-eye-slash text-danger"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="col-9">
        <Panel
          :title="'Informasi ' + filter.type"
          subtitle="Below is list of informasi"
        >
          <template v-slot:toolbar>
            <router-link
              v-if="filter.type === 'kepesertaan'"
              :to="'informasi/' + filter.type + '/add'"
              class="btn btn-sm btn-success"
            >
              <span class="d-flex align-items-center font-weight-bolder">
                <i class="fas fa-plus mb-0 mr-1"></i>
                Add Data
              </span>
            </router-link>
            <b-button
              variant="success"
              v-else
              class="mr-4"
              size="sm"
              v-b-modal.modal-add
            >
              <span class="d-flex align-items-center font-weight-bolder">
                <i class="fas fa-plus mb-0 mr-1"></i>
                Add Data
              </span>
            </b-button>
          </template>
          <template v-slot:body>
            <table class="table table-striped">
              <thead class="bg-dark text-white">
                <tr>
                  <th>Name</th>
                  <th>Visibility</th>
                  <th class="text-center" width="30%">Action</th>
                </tr>
              </thead>
              <tbody v-if="!loading && !failed && informasiData.length > 0">
                <tr v-for="(item, index) in informasiData" :key="index">
                  <td class="font-weight-bolder">{{ item.name }}</td>
                  <td>
                    <span
                      v-if="item.visibility === 'Public'"
                      class="badge badge-success"
                    >
                      {{ item.visibility }}
                    </span>
                    <span
                      v-else-if="item.visibility === 'Private'"
                      class="badge badge-primary"
                    >
                      {{ item.visibility }}
                    </span>
                    <span v-else class="badge badge-danger">
                      {{ item.visibility }}
                    </span>
                  </td>
                  <td class="text-center">
                    <router-link
                      :to="'informasi/' + filter.type + '/detail/' + item.id"
                      class="btn btn-sm btn-transparent p-0 mr-4"
                    >
                      <i class="fa fa-eye text-success"></i>
                    </router-link>
                    <button
                      @click="decreaseOrder(item.id)"
                      :disabled="Number(item.order_seq) === 1"
                      class="btn btn-sm btn-transparent p-0 mr-4"
                    >
                      <i class="fa fa-chevron-up text-primary"></i>
                    </button>
                    <button
                      @click="increaseOrder(item.id)"
                      :disabled="total_rows === Number(item.order_seq)"
                      class="btn btn-sm btn-transparent p-0"
                    >
                      <i class="fa fa-chevron-down text-primary"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="informasiData.length === 0 && !loading">
                <tr>
                  <th class="text-center" colspan="3">
                    Data is not found
                  </th>
                </tr>
              </tbody>
              <tbody v-else-if="failed && !loading">
                <tr>
                  <th class="text-center" colspan="3">
                    Failed fetch the data. please
                    <span
                      @click="fetchData"
                      class="cursor-pointer text-danger font-weight-bolder"
                    >
                      Retry
                    </span>
                  </th>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <th class="text-center" colspan="3">Loading...</th>
                </tr>
              </tbody>
            </table>
            <b-pagination
              @change="onPageChange"
              :total-rows="total_rows"
              :per-page="filter.limit"
              v-model="filter.page"
              aria-controls="itemList"
              class="mt-8"
              align="center"
            ></b-pagination>
          </template>
        </Panel>
        <AddInformasiModal :informasi_type="filter.type" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import AddInformasiModal from '../components/AddInformasiModal.vue';
import axios from 'axios';
@Component({
  components: { Panel, AddInformasiModal }
})
export default class Informasi extends Vue {
  filter: any = {
    limit: 10,
    page: 1,
    name: '',
    visibility: '',
    type: 'kepesertaan'
  };
  informasiData = [];
  total_rows = 0;
  loading = false;
  failed = false;

  mounted() {
    this.fetchData();
  }

  onPageChange(selectedPage: number) {
    this.filter.page = selectedPage;
    this.fetchData();
  }

  selectCategory(value: string) {
    this.filter.type = value;
    this.fetchData();
  }

  async fetchData() {
    try {
      this.failed = false;
      this.loading = true;
      const queryString = new URLSearchParams(this.filter).toString();
      const { data } = await axios.get('informasi/get?' + queryString);
      this.informasiData = data.data.data;
      this.total_rows = data.data.pagination.total_rows;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.failed = true;
    }
  }

  async increaseOrder(id: string) {
    this.loading = true;
    await axios.put('informasi/increase-order/' + id);
    this.fetchData();
  }

  async decreaseOrder(id: string) {
    this.loading = true;
    await axios.put('informasi/decrease-order/' + id);
    this.fetchData();
  }
}
</script>
