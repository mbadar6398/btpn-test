<template>
  <div class="container">
    <Panel title="Pages" subtitle="Below is list of pages on your website">
      <template v-slot:toolbar>
        <b-button variant="success" class="mr-4" size="sm" v-b-modal.modal-add>
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-plus mb-0 mr-1"></i>
            New Page
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
              <th>Type</th>
              <th>Slug</th>
              <th>Visibility</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody v-if="fetchLoading">
            <tr>
              <td colspan="5" class="text-center">Loading...</td>
            </tr>
          </tbody>
          <tbody v-else-if="fetchFailed">
            <tr>
              <td colspan="5" class="text-center">
                Failed fetching data, please
                <span
                  @click="fetchData"
                  class="cursor-pointer text-danger font-weight-bolder"
                >
                  retry
                </span>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item, index) in pages" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.slug }}</td>
              <td>
                <span
                  v-if="item.visibility === 'Public'"
                  class="badge badge-success font-weight-bolder"
                >
                  {{ item.visibility }}
                </span>
                <span
                  v-else-if="item.visibility === 'Private'"
                  class="badge badge-primary font-weight-bolder"
                >
                  {{ item.visibility }}
                </span>
                <span v-else class="badge badge-danger font-weight-bolder">
                  {{ item.visibility }}
                </span>
              </td>
              <td class="text-center">
                <router-link
                  :to="`/pages/detail/${item.id}`"
                  class="btn btn-transparent text-danger btn-sm p-0 mr-4"
                >
                  <i class="fa fa-eye text-success"></i>
                </router-link>
                <button
                  @click="deletePage(item.id)"
                  :disabled="item.type === 'Template'"
                  class="btn btn-transparent text-danger btn-sm p-0"
                >
                  <i class="fa fa-trash-alt text-danger"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex align-items-center justify-content-between">
          <p class="mb-0 font-weight-bolder">Total data : {{ total_rows }}</p>
          <!-- Pagination -->
          <b-pagination
            @change="onPageChange"
            :total-rows="total_rows"
            :per-page="filter.limit"
            v-model="filter.page"
            aria-controls="itemList"
            align="center"
          ></b-pagination>
        </div>
      </template>
    </Panel>
    <AddModal @refresh="fetchData" />
    <FilterModal @filter="filterData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '../../../components/panel/Panel.vue';
import AddModal from '../components/AddModal.vue';
import FilterModal from '../components/FilterModal.vue';
import axios from 'axios';

@Component({
  components: { Panel, AddModal, FilterModal },
  computed: {}
})
export default class Pages extends Vue {
  pages = [];
  total_rows = 0;
  fetchLoading = false;
  fetchFailed = false;

  filter: any = {
    page: 1,
    limit: 10,
    name: '',
    type: '',
    visibility: ''
  };
  mounted() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.fetchLoading = true;
      this.fetchFailed = false;
      const queryString = new URLSearchParams(this.filter).toString();
      const { data } = await axios.get('pages?' + queryString);
      this.pages = data.data.data;
      this.total_rows = data.data.pagination.total_rows;
      this.fetchLoading = false;
    } catch (error) {
      this.fetchLoading = false;
      this.fetchFailed = true;
    }
  }

  async deletePage(id: string) {
    this.$swal({
      title: 'Are you sure want to delete this page?',
      text: 'Your action could not be reverted',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete('/page/delete/' + id);
        this.fetchData();
      }
    });
  }

  onPageChange(selectedPage: number) {
    this.filter.page = selectedPage;
    this.fetchData();
  }

  filterData(filterData: any) {
    this.filter.name = filterData.name;
    this.filter.visibility = filterData.visibility;
    this.filter.type = filterData.type;
    this.fetchData();
  }
}
</script>
