<template>
  <div class="container">
    <!-- Form -->
    <div class="row">
      <div class="col-12">
        <h4 class="mb-6">Create New Post</h4>
      </div>
      <div class="col-8">
        <div class="form-group">
          <input
            type="text"
            v-model="dataToPost.title"
            placeholder="Your title here..."
            class="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <div class="position-relative">
            <div
              style="position: absolute; top: 0;bottom: 0; left: 0; height: 100%; display: flex; align-items: center; background: #eeeeee; border: solid 1px #cccccc; padding: 0 1rem;"
              for=""
            >
              http://mypertamina.id/
            </div>
            <input
              style="padding-left: 200px;"
              type="text"
              v-model="dataToPost.slug"
              class="form-control form-control-lg"
            />
          </div>
          <label for="" class="mt-2">
            If you keep this blank. this slug will automatically use the title
            of this post
          </label>
        </div>
        <div class="form-group bg-white">
          <Editor
            api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
            v-model="dataToPost.content"
            :init="tinyMceConfig"
          />
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header font-weight-bolder p-4">
            Configuration
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <label for="">Visibility :</label>
              <select
                class="form-control form-control-solid form-control-sm"
                v-model="dataToPost.visibility"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Status :</label>
              <select
                class="form-control form-control-solid form-control-sm"
                v-model="dataToPost.status"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Category :</label>
              <select
                v-model="dataToPost.category_id"
                class="form-control form-control-solid form-control-sm mb-4"
              >
                <option value="" v-if="categoryLoading">Loading...</option>
                <option value="">Uncategorized</option>
                <option
                  v-for="(item, index) in categories"
                  :key="index"
                  :value="item.id"
                  v-text="item.name"
                ></option>
              </select>
              <span
                v-b-modal.modal-post-category
                v-if="!categoryLoading"
                class="text-primary cursor-pointer"
              >
                <i class="la la-pencil text-primary"></i>
                Manage category
              </span>
            </div>
            <button
              @click="savePost"
              v-if="!categoryLoading && !uploadLoading"
              :disabled="savePostLoading"
              class="btn btn-primary btn-block btn-sm font-weight-bolder"
            >
              <div v-if="!savePostLoading">
                <i class="la la-save"></i>
                Save changes
              </div>

              <div
                class="d-flex align-items-center justify-content-center"
                v-else
              >
                <span
                  class="spinner spinner-track spinner-primary spinner-sm mr-6"
                ></span>
                <span class="ml-2">Loading...</span>
              </div>
            </button>

            <router-link
              to="/posts"
              class="btn btn-default btn-block btn-sm text-dark font-weight-bolder mt-4"
            >
              <span
                class="d-flex align-items-center justify-content-center font-weight-bolder"
              >
                Cancel
              </span>
            </router-link>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-header font-weight-bolder p-4">
            Featured Image
          </div>
          <div class="card-body p-4">
            <img
              :src="
                dataToPost.image !== ''
                  ? dataToPost.image
                  : 'https://via.placeholder.com/1200x628.png'
              "
              class="img-fluid"
              alt=""
            />
            <div class="mt-4">
              <input
                type="file"
                class="d-none"
                ref="imageInput"
                id="imageINput"
                accept="image/*"
                @change="uploadImage"
                :disabled="uploadLoading"
              />
              <button
                id="kt_login_signin_submit"
                class="btn btn-primary btn-block btn-sm"
                :disabled="uploadLoading"
                @click="triggerUpload"
              >
                <div v-if="!uploadLoading">
                  <span>
                    <i class="la la-upload"></i>
                    Upload
                  </span>
                </div>
                <div
                  class="d-flex align-items-center justify-content-center"
                  v-else
                >
                  <span
                    class="spinner spinner-track spinner-primary spinner-sm mr-6"
                  ></span>
                  <span class="ml-2">Loading...</span>
                </div>
              </button>
              <button
                class="btn btn-danger btn-block btn-sm mt-4"
                @click="removeImage"
                v-if="dataToPost.image !== ''"
              >
                <i class="la la-trash"></i>
                Remove image
              </button>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-header font-weight-bolder p-4">
            Tags
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-sm form-control-solid"
                v-on:keyup.enter="addTags()"
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
        <div class="card mt-4">
          <div
            class="card-header font-weight-bolder p-4 d-flex justify-content-between align-items-center"
          >
            <span>Datatable</span>
            <span v-b-modal.modal-add-table class="cursor-pointer">
              <i class="fa fa-plus text-success"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <AddTable />
    <CategoryModal :selectedCategoryId="dataToPost.category_id" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import CategoryModal from '../components/CategoryModal.vue';
import AddTable from '../components/AddTable.vue';

import Editor from '@tinymce/tinymce-vue';

interface DataToPostType {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  image: string;
  category_id: string;
  visibility: string;
  status: string;
}

@Component({
  components: { Editor, CategoryModal, AddTable },
  computed: {}
})
export default class PostsCreate extends Vue {
  get categories() {
    return this.$store.getters['posts/CATEGORIES'];
  }

  modules = {
    table: true
  };

  tagInput = '';
  uploadLoading = false;
  categoryLoading = true;
  savePostLoading = false;
  dataToPost: DataToPostType = {
    title: '',
    content: '',
    slug: '',
    tags: [],
    image: '',
    category_id: '',
    visibility: 'Public',
    status: 'Published'
  };

  tinyMceConfig = {
    selector: 'textarea#open-source-plugins',
    plugins:
      'preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: false,
    image_advtab: true,
    importcss_append: true,
    height: 1200,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  addTags() {
    if (this.tagInput) {
      this.dataToPost.tags.push(this.tagInput);
      this.tagInput = '';
    }
  }
  removeTag(index: number) {
    this.dataToPost.tags.splice(index, 1);
  }

  triggerUpload() {
    const elem: HTMLElement = this.$refs.imageInput as HTMLElement;
    elem.click();
  }

  removeImage() {
    this.dataToPost.image = '';
    const elm: any = this.$refs.imageInput as HTMLElement;
    elm.value = '';
  }

  uploadImage(event: any) {
    this.uploadLoading = true;
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('file', image);
    formData.append('directory', 'posts/');
    const headers = { 'Content-Type': 'multipart/form-data' };
    axios
      .post('/upload', formData, { headers })
      .then((res) => {
        this.dataToPost.image = res.data.data.url;
      })
      .finally(() => {
        this.uploadLoading = false;
      });
  }

  async mounted() {
    try {
      await this.$store.dispatch('posts/GET_POSTS_CATEGORY');
      this.categoryLoading = false;
    } catch (error) {
      return error;
    }
  }

  convertToSlug(Text: string) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  async savePost() {
    this.savePostLoading = true;
    if (this.dataToPost.slug === '') {
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.title);
    }
    try {
      const { data } = await this.$store.dispatch(
        'posts/CREATE_NEW_POST',
        this.dataToPost
      );
      this.savePostLoading = false;
      this.$router.push({ path: '/posts/get/' + data });
    } catch (error) {
      return error;
    }
  }
}
</script>
