<template>
  <div class="container">
    <div class="row">
      <!-- Content container -->
      <div class="col-8">
        <!-- Title -->
        <div class="form-group">
          <input
            type="text"
            v-model="dataToPost.title"
            placeholder="Tulis judul disini"
            class="form-control form-control-lg"
          />
        </div>

        <!-- Slug -->
        <div class="form-group mb-2">
          <div class="position-relative d-flex">
            <div class="post-slug-label">{{ base_url }}</div>
            <input
              type="text"
              v-model="dataToPost.slug"
              class="form-control form-control-lg post-slug-input"
            />
          </div>
          <label for="" class="mt-2">
            Jika anda membiarkan field slug diatas kosong, maka akan secara
            otomatis mengambil dari judul artikel
          </label>
        </div>

        <!-- Content -->
        <div class="form-group bg-white">
          <Editor
            api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
            v-model="dataToPost.content"
            :init="tinyMceConfig"
          />
        </div>
      </div>

      <div class="col-4">
        <!-- Configuration -->
        <div class="card">
          <div class="card-header font-weight-bolder p-4">
            Konfigurasi
          </div>
          <div class="card-body p-4">
            <!-- Published date -->
            <div class="form-group">
              <label class="font-weight-bolder" for="">Published date :</label>
              <date-picker
                class="d-block w-100"
                v-model="dataToPost.created_date"
                value-type="format"
                type="datetime"
              ></date-picker>
            </div>

            <!-- Visibility -->
            <div class="form-group">
              <label class="font-weight-bolder" for="">Visibility :</label>
              <select
                class="form-control form-control-solid"
                v-model="dataToPost.visibility"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <!-- Status -->
            <div class="form-group">
              <label class="font-weight-bolder" for="">Status :</label>
              <select
                class="form-control form-control-solid"
                v-model="dataToPost.status"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <!-- Category -->
            <div class="form-group mb-2">
              <label class="font-weight-bolder" for="">Kategori :</label>
              <SelectData
                :loading="fetchCategoryLoading"
                :data="categories"
                :select_all="true"
                select_all_name="Uncategorized"
                :blank="false"
                :failed="fetchCategoryFailed"
                :required="false"
                v-model="dataToPost.category_id"
                @retry="getCategory"
              />
            </div>

            <!-- Manage category -->
            <div class="form-group">
              <span
                v-b-modal.modal-post-category
                v-if="!fetchCategoryLoading"
                class="text-primary font-weight-bolder cursor-pointer"
              >
                <i class="la la-pencil text-primary"></i>
                Kelola kategori
              </span>
            </div>

            <!-- Save changes -->
            <ButtonProcess
              v-if="!fetchCategoryLoading && !uploadLoading"
              label="Simpan Perubahan"
              :loading="savePostLoading"
              @process="savePost"
            />

            <!-- Cancel -->
            <router-link
              to="/posts"
              class="btn btn-default btn-block btn-sm text-dark font-weight-bolder mt-4"
            >
              <span
                class="d-flex align-items-center justify-content-center font-weight-bolder"
              >
                Batalkan
              </span>
            </router-link>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="card mt-4">
          <div class="card-header font-weight-bolder p-4">
            Gambar utama
          </div>
          <div class="card-body p-4">
            <img
              v-if="dataToPost.image"
              :src="dataToPost.image"
              class="img-fluid"
            />
            <div v-if="dataToPost.image" class="mt-2">
              <a
                class="text-danger font-weight-bolder cursor-pointer mt-2"
                @click="dataToPost.image = null"
              >
                <i class="fa fa-trash-alt text-danger"></i>
                Hapus
              </a>
            </div>
            <div class="mt-4">
              <UploadInput
                directory="data"
                name="Image"
                :encrypt="true"
                :overwrite="false"
                v-model="dataToPost.image"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="card mt-4" v-if="postConfig.tags">
          <div class="card-header font-weight-bolder p-4">
            Tags
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-sm form-control-solid"
                v-on:keyup.enter="addTag()"
                v-model="tagInput"
              />
              <label class="text-dark-50 font-size-sm" for="">
                Press enter to add
              </label>
            </div>
            <div class="tags">
              <span
                v-for="(item, index) in dataToPost.tags"
                :key="index"
                class="label label-lg label-light-primary label-inline mr-4 mb-4"
              >
                <span
                  class="cursor-pointer d-inline-block"
                  @click="removeTag(index)"
                >
                  #{{ item }}
                </span>
              </span>
            </div>
            <label class="text-dark-50 font-size-sm mt-2" for="">
              Click tag to remove
            </label>
          </div>
        </div>
      </div>
    </div>
    <AddTable />
    <CategoryModal :selectedCategoryId="dataToPost.category_id" />
  </div>
</template>

<script lang="ts">
import DatePicker from 'vue2-datepicker';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import CategoryModal from '../components/CategoryModal.vue';
import ButtonProcess from '@/components/ButtonProcess.vue';
import SelectData from '@/components/SelectData.vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import AddTable from '../components/AddTable.vue';
import MainConfig from '@/config/config';
import moment from 'moment';

import Editor from '@tinymce/tinymce-vue';

@Component({
  components: {
    Editor,
    CategoryModal,
    AddTable,
    ButtonProcess,
    SelectData,
    UploadInput,
    DatePicker
  },
  computed: {}
})
export default class PostsCreate extends Vue {
  // Categories
  fetchCategoryLoading = true;
  fetchCategoryFailed = false;
  categories = [];

  // Posts
  savePostLoading = false;

  // Images
  uploadLoading = false;

  // Tags
  tagInput = '';

  // Form
  dataToPost: any = {
    title: '',
    content: '',
    slug: '',
    tags: [],
    image: '',
    category_id: '',
    created_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    visibility: 'Public',
    status: 'Published'
  };

  get postConfig() {
    return MainConfig.postConfig;
  }

  get tinyMceConfig() {
    return MainConfig.tinyMceConfig;
  }

  get base_url() {
    return MainConfig.base_url;
  }

  async mounted() {
    this.getCategory();
  }

  async getCategory() {
    try {
      this.fetchCategoryLoading = true;
      this.fetchCategoryFailed = false;
      const category = await axios.get('/posts/get-category');
      this.categories = category.data.data;
      this.fetchCategoryLoading = false;
    } catch (error) {
      this.fetchCategoryLoading = false;
      this.fetchCategoryFailed = true;
    }
  }

  addTag() {
    if (this.tagInput) {
      this.dataToPost.tags.push(this.tagInput);
      this.tagInput = '';
    }
  }

  removeTag(index: number) {
    this.dataToPost.tags.splice(index, 1);
  }

  convertToSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  async savePost() {
    this.savePostLoading = true;
    if (this.dataToPost.slug === '') {
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.title);
    } else {
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.slug);
    }
    try {
      const { data } = await axios.post('/posts/create-post', this.dataToPost);
      this.savePostLoading = false;
      this.$router.push({ path: '/posts/get/' + data.data });
    } catch (error) {
      this.savePostLoading = false;
      return error;
    }
  }
}
</script>

<style scoped>
.post-slug-label {
  white-space: nowrap !important;
  height: 100% !important;
  display: flex !important;
  height: 44px !important;
  align-items: center !important;
  background: #eeeeee !important;
  border: solid 1px #cccccc !important;
  padding: 0 1rem !important;
}

.post-slug-input {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
</style>
