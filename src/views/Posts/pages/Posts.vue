<template>
  <div class="container">
    <Panel :title="panelTitle" :subtitle="panelSubtitle">
      <template v-slot:toolbar>
        <b-button
          class="mr-4"
          variant="success"
          size="sm"
          v-b-modal.modal-post-filter
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-filter mb-0 mr-1"></i>
            Filter Data
          </span>
        </b-button>

        <router-link to="/posts/create" class="btn btn-sm btn-primary">
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-plus mb-0 mr-1"></i>
            New post
          </span>
        </router-link>
      </template>

      <template v-slot:body>
        <div class="row" v-if="!posts_loading">
          <div
            class="col-12 col-md-12 col-lg-6 col-xl-4 mb-8"
            v-for="(item, index) in posts"
            :key="index"
          >
            <PostsCard :data="item" />
          </div>
        </div>
        <div class="row" v-else>
          <div
            class="col-12 col-md-12 col-lg-6 col-xl-4 mb-8"
            v-for="index in 6"
            :key="index"
          >
            <content-placeholders :rounded="true">
              <content-placeholders-img style="height: 280px;" />
              <content-placeholders-heading />
              <content-placeholders-text :lines="2" />
            </content-placeholders>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <!-- Information -->
        <div>
          <span>
            Rows per page
            <select
              @change="onLimitChange"
              class="ml-2"
              v-model="limit"
              name=""
              id=""
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="32">32</option>
            </select>
          </span>
        </div>

        <!-- Pagination -->
        <b-pagination
          @change="onPageChange"
          :total-rows="posts_total"
          :per-page="limit"
          v-model="page"
          aria-controls="itemList"
          align="center"
        ></b-pagination>
      </template>
    </Panel>

    <FilterPostsModal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostsCard from '../components/PostsCard.vue';
import FilterPostsModal from '../components/PostsFilterModal.vue';
import Panel from '../../../components/panel/Panel.vue';
import { PostTypes } from '../../../interfaces/posts';
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'posts/GET_FIELDS',
  mutationType: 'posts/UPDATE_FIELDS'
});

@Component({
  components: { PostsCard, FilterPostsModal, Panel },
  computed: {
    ...mapFields({
      posts: 'posts',
      posts_total: 'posts_total',
      posts_loading: 'posts_loading',
      limit: 'posts_filter.limit',
      page: 'posts_filter.page'
    })
  }
})
export default class Posts extends Vue {
  posts!: PostTypes[];
  posts_total: number;
  posts_loading!: boolean;
  page: number;
  limit: number;
  panelTitle = 'Daftar Artikel';
  panelSubtitle = 'Menampilkan 10 dari 200 data';
  filter = {
    limit: 6,
    page: 1
  };

  async mounted() {
    this.$store.commit('posts/RESET_POSTS_FILTER');
    this.getPosts();
    this.getCategories();
  }

  async getCategories() {
    try {
      await this.$store.dispatch('posts/GET_POSTS_CATEGORY');
    } catch (error) {
      return error;
    }
  }

  async getPosts() {
    try {
      this.posts_loading = true;
      await this.$store.dispatch('posts/GET_POSTS', this.filter);
      this.posts_loading = false;
    } catch (error) {
      return error;
    }
  }

  onLimitChange() {
    this.page = 1;
    this.getPosts();
  }

  onPageChange(selectedPage: number) {
    this.page = selectedPage;
    this.getPosts();
  }
}
</script>
