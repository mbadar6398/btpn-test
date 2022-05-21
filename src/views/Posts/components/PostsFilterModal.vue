<template>
  <b-modal id="modal-post-filter" title="Filter Data">
    <form action="">
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Judul artikel</label>
            <input
              v-model="filter.title"
              type="text"
              class="form-control form-control-solid"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="">Kategori</label>
            <select
              class="form-control form-control-solid"
              v-model="filter.category_id"
            >
              <option value="">Semua kategori</option>
              <option value="Uncategorized">Uncategorized</option>
              <option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
                v-text="item.name"
              ></option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="">Status</label>
            <select
              class="form-control form-control-solid"
              v-model="filter.status"
            >
              <option value="">Semua status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="">Visibilitas</label>
            <select
              class="form-control form-control-solid"
              v-model="filter.visibility"
            >
              <option value="">Semua visibilitas</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>
        <div class="col-12 col-lg-12">
          <div class="form-group mb-0">
            <label for="">Tanggal terbit</label>
            <date-picker
              v-model="selectedDate"
              value-type="format"
              range
            ></date-picker>
          </div>
        </div>
      </div>
    </form>
    <template #modal-footer>
      <b-button variant="primary" @click="resetFilter">
        Reset
      </b-button>
      <b-button variant="success" @click="filterPosts">
        Filter Data
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

@Component({
  components: {
    DatePicker
  }
})
export default class PostsFilterModal extends Vue {
  selectedDate = ['', ''];
  filter: any = {
    title: '',
    category_id: '',
    status: '',
    visibility: '',
    start_date: '',
    end_date: '',
    limit: '',
    page: ''
  };

  get categories() {
    return this.$store.getters['posts/CATEGORIES'];
  }

  get parsedStartDate() {
    return this.selectedDate[0]
      ? moment(this.selectedDate[0] + ' ' + '00:00:00').format(
          'YYYY-MM-DD HH:mm:ss'
        )
      : '';
  }

  get parsedEndDate() {
    return this.selectedDate[1]
      ? moment(this.selectedDate[1] + ' ' + '23:59:59').format(
          'YYYY-MM-DD HH:mm:ss'
        )
      : '';
  }

  resetFilter() {
    this.selectedDate = ['', ''];
    this.filter = {
      title: '',
      category_id: '',
      status: '',
      visibility: '',
      start_date: '',
      end_date: '',
      limit: '',
      page: ''
    };
    this.filterPosts();
  }

  async filterPosts() {
    this.filter.start_date = this.parsedStartDate;
    this.filter.end_date = this.parsedEndDate;
    this.filter.page = 1;
    this.$emit('refresh', this.filter);
    this.$root.$emit('bv::toggle::modal', 'modal-post-filter', '#btnToggle');
  }
}
</script>
