<template>
  <b-modal id="modal-post-filter" title="Filter Data">
    <form action="">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label for="">Post title</label>
            <input
              v-model="title"
              type="text"
              class="form-control form-control-solid"
              placeholder="Search post title..."
            />
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label for="">Post category</label>
            <select
              class="form-control form-control-solid"
              v-model="category_id"
            >
              <option value="">All categories</option>
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
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label for="">Status</label>
            <select class="form-control form-control-solid" v-model="status">
              <option value="">All status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label for="">Visiblity</label>
            <select
              class="form-control form-control-solid"
              v-model="visibility"
            >
              <option value="">All visibility</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>
        <div class="col-12 col-lg-12">
          <div class="form-group mb-0">
            <label for="">Date</label>
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
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'posts/GET_FIELDS',
  mutationType: 'posts/UPDATE_FIELDS'
});

@Component({
  components: {
    DatePicker
  },
  computed: {
    ...mapFields({
      posts_loading: 'posts_loading',
      title: 'posts_filter.title',
      category_id: 'posts_filter.category_id',
      status: 'posts_filter.status',
      visibility: 'posts_filter.visibility',
      start_date: 'posts_filter.start_date',
      end_date: 'posts_filter.end_date',
      limit: 'posts_filter.limit',
      page: 'posts_filter.page'
    })
  }
})
export default class PostsFilterModal extends Vue {
  posts_loading!: boolean;
  title!: string;
  category_id!: string;
  status!: string;
  visibility!: string;
  start_date!: string;
  end_date!: string;
  limit!: number;
  page!: number;
  selectedDate = ['', ''];

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
    this.$store.commit('posts/RESET_POSTS_FILTER');
    this.selectedDate = ['', ''];
  }

  async filterPosts() {
    this.$root.$emit('bv::toggle::modal', 'modal-post-filter', '#btnToggle');
    this.start_date = this.parsedStartDate;
    this.end_date = this.parsedEndDate;
    this.page = 1;
    this.posts_loading = true;
    await this.$store.dispatch('posts/GET_POSTS');
    this.posts_loading = false;
  }
}
</script>
