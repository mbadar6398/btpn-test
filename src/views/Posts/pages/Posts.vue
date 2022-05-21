<template>
  <div class="container">
    <Panel
      title="Daftar Artikel"
      subtitle="Dibawah ini adalah daftar artikel yang tersedia di website"
    >
      <template v-slot:toolbar>
        <b-button
          class="mr-4"
          variant="success"
          size="sm"
          v-b-modal.modal-post-filter
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-filter mb-0 mr-1"></i>
            Filter data
          </span>
        </b-button>

        <router-link to="/posts/create" class="btn btn-sm btn-primary">
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-plus mb-0 mr-1"></i>
            Buat artikel
          </span>
        </router-link>
      </template>

      <template v-slot:body>
        <div class="row" v-if="posts_loading">
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

        <div
          class="row justify-content-center my-24"
          v-else-if="!posts_loading && posts_error"
        >
          <div class="col-6 text-center">
            <i
              class="fas fa-sad-cry text-warning"
              style="font-size: 122px;"
            ></i>
            <h1 class="text-danger font-weight-bolder mt-4">Gagal !</h1>
            <h4 class="text-center font-weight-bolder">
              tidak dapat melakukan permintaan saat ini
            </h4>
            <p>Harap periksa koneksi internet anda atau hubungi admin</p>
            <button
              @click="getPosts"
              class="btn btn-danger btn-sm font-weight-bolder"
            >
              <i class="flaticon-refresh"></i>
              Coba kembali
            </button>
          </div>
        </div>

        <div
          class="row justify-content-center my-24"
          v-else-if="!posts_loading && total_posts === 0"
        >
          <div class="col-6 text-center">
            <i
              class="fas fa-sad-cry text-warning"
              style="font-size: 122px;"
            ></i>
            <h1 class="text-success font-weight-bolder mt-4">
              Tidak ditemukan
            </h1>
            <h4 class="text-center text-secondary font-weight-bold">
              Tidak dapat menemukan data yang kamu cari.
            </h4>
            <p>Harap mengubah kata kunci dan mencoba kembali</p>
          </div>
        </div>
        <div class="row" v-else>
          <div
            class="col-12 col-md-12 col-lg-6 col-xl-4 mb-8"
            v-for="(item, index) in posts"
            :key="index"
          >
            <PostsCard :data="item" />
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <!-- Information -->
        <div>
          <span>Total data : {{ total_posts }}</span>
        </div>

        <!-- Pagination -->
        <b-pagination
          @change="onPageChange"
          :total-rows="total_posts"
          :per-page="filter.limit"
          v-model="filter.page"
          aria-controls="itemList"
          align="center"
          class="mb-0"
        ></b-pagination>
      </template>
    </Panel>

    <FilterPostsModal @refresh="filterData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostsCard from '../components/PostsCard.vue';
import FilterPostsModal from '../components/PostsFilterModal.vue';
import Panel from '../../../components/panel/Panel.vue';
import axios from 'axios';

export interface CategoriesTypes {
  id: string;
  name: string;
}

interface PostTypes {
  id: string;
  category: CategoriesTypes;
  slug: string;
  title: string;
  content: string;
  featured_img: string;
  tags: string;
  visibility: string;
  status: string;
  created_date: string;
  updated_date: string;
}

@Component({
  components: { PostsCard, FilterPostsModal, Panel }
})
export default class Posts extends Vue {
  posts: PostTypes[] = [];
  total_posts = 0;
  posts_loading = false;
  posts_error = false;
  filter: any = {
    title: '',
    category_id: '',
    status: '',
    visibility: '',
    start_date: '',
    end_date: '',
    limit: 6,
    page: 1
  };

  async mounted() {
    this.getPosts();
  }

  async getPosts() {
    try {
      this.posts_loading = true;
      this.posts_error = false;
      const queryString = new URLSearchParams(this.filter).toString();
      const data = await axios.get('posts/get?' + queryString);
      this.posts = data.data.data.data;
      this.total_posts = data.data.data.pagination.total_rows;
      this.posts_loading = false;
    } catch (error) {
      this.posts_loading = false;
      this.posts_error = true;
    }
  }

  onLimitChange() {
    this.getPosts();
  }

  filterData(data: any) {
    this.filter = data;
    this.getPosts();
  }

  onPageChange(selectedPage: number) {
    this.filter.page = selectedPage;
    this.getPosts();
  }
}
</script>
