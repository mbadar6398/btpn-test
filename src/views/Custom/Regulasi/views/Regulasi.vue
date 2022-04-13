<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Panel :title="'Regulasi'" subtitle="Below is list of regulasi">
          <template v-slot:toolbar>
            <b-button
              variant="success"
              class="mr-4"
              size="sm"
              v-b-modal.modal-add
            >
              <span class="d-flex align-items-center font-weight-bolder">
                <i class="fas fa-plus mb-0 mr-1"></i>
                Add Data
              </span>
            </b-button>
            <b-button variant="primary" size="sm" v-b-modal.modal-filter>
              <span class="d-flex align-items-center font-weight-bolder">
                <i class="fas fa-filter mb-0 mr-1"></i>
                Filter Data
              </span>
            </b-button>
          </template>
          <template v-slot:body>
            <table class="table table-striped">
              <thead class="bg-dark text-white">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Visibility</th>
                  <th class="text-center" width="30%">Action</th>
                </tr>
              </thead>
              <tbody v-if="!loading && !failed && regulasiData.length > 0">
                <tr v-for="(item, index) in regulasiData" :key="index">
                  <td class="font-weight-bolder">{{ item.name }}</td>
                  <td>{{ item.content }}</td>
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
                      :to="'regulasi/detail/' + item.id"
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
              <tbody v-else-if="regulasiData.length === 0 && !loading">
                <tr>
                  <th class="text-center" colspan="4">
                    Data is not found
                  </th>
                </tr>
              </tbody>
              <tbody v-else-if="failed && !loading">
                <tr>
                  <th class="text-center" colspan="4">
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
                  <th class="text-center" colspan="4">Loading...</th>
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
          <!-- Pagination -->
        </Panel>
        <RegulasiAddModal />
        <RegulasiFilterModal @filterData="filterData" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import axios from 'axios';
import RegulasiAddModal from '../components/RegulasiAddModal.vue';
import RegulasiFilterModal from '../components/RegulasiFilterModal.vue';
@Component({
  components: { Panel, RegulasiAddModal, RegulasiFilterModal }
})
export default class Regulasi extends Vue {
  regulasiData = [];
  total_rows = 0;
  loading = false;
  failed = false;
  filter: any = {
    limit: 10,
    page: 1,
    name: '',
    visibility: ''
  };

  mounted() {
    this.fetchData();
  }

  onPageChange(selectedPage: number) {
    this.filter.page = selectedPage;
    this.fetchData();
  }

  filterData(val: any) {
    this.filter.name = val.name;
    this.filter.visibility = val.visibility;
    this.filter.page = 1;
    this.fetchData();
  }

  async fetchData() {
    try {
      const queryString = new URLSearchParams(this.filter).toString();
      this.failed = false;
      this.loading = true;
      const { data } = await axios.get('regulasi/get?' + queryString);
      this.regulasiData = data.data.data;
      this.total_rows = data.data.pagination.total_rows;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.failed = true;
    }
  }

  async increaseOrder(id: string) {
    this.loading = true;
    await axios.put('regulasi/increase-order/' + id);
    this.fetchData();
  }

  async decreaseOrder(id: string) {
    this.loading = true;
    await axios.put('regulasi/decrease-order/' + id);
    this.fetchData();
  }
}
</script>
