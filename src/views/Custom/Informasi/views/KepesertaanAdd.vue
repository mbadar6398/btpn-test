<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="form-group">
          <input
            class="form-control form-control-lg"
            placeholder="Type title here"
            type="text"
            v-model="dataToPost.name"
          />
        </div>
        <div class="form-group bg-white">
          <Editor
            api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
            :init="tinyMceConfig"
            v-model="dataToPost.content"
          />
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header font-weight-bolder p-4">
            Configuration
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <label class="font-weight-bolder" for="">Visibility</label>
              <select
                v-model="dataToPost.visibility"
                class="form-control form-control-solid"
              >
                <option class="Public">Public</option>
                <option class="Private">Private</option>
                <option class="Hidden">Hidden</option>
              </select>
            </div>
            <div class="form-group mb-4">
              <button
                @click="submit"
                :disabled="loading"
                class="btn btn-primary btn-sm btn-block"
              >
                <div v-if="!loading">
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
            </div>
            <div class="form-group">
              <router-link
                to="/informasi"
                class="btn btn-secondary btn-sm btn-block"
              >
                Back
              </router-link>
            </div>
          </div>
        </div>
        <div class="card mt-8">
          <div class="card-header font-weight-bolder p-4">
            Icon
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <div
                style="background: #cccccc; padding: 1rem; text-align: center;"
              >
                <img
                  class="img-fluid"
                  :src="
                    dataToPost.icon
                      ? dataToPost.icon
                      : 'https://via.placeholder.com/1366x768?text=Icon'
                  "
                  alt=""
                />
              </div>
            </div>
            <div
              v-if="dataToPost.icon"
              @click="dataToPost.icon = null"
              class="text-danger font-weight-bolder cursor-pointer mb-4"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Remove Icon
            </div>
            <div class="form-group mb-4">
              <UploadInput
                directory="data"
                name="Featured Icon"
                :encrypt="true"
                :overwrite="false"
                v-model="dataToPost.icon"
                accept="*"
              />
            </div>
          </div>
        </div>
        <div class="card mt-8">
          <div class="card-header font-weight-bolder p-4">
            Featured Image
          </div>
          <div class="card-body p-4">
            <div class="form-group">
              <img
                class="img-fluid"
                :src="
                  dataToPost.featured_img
                    ? dataToPost.featured_img
                    : 'https://via.placeholder.com/1366x768?text=Image'
                "
                alt=""
              />
            </div>
            <div
              v-if="dataToPost.featured_img"
              @click="dataToPost.featured_img = null"
              class="text-danger font-weight-bolder cursor-pointer mb-4"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Remove Image
            </div>
            <div class="form-group mb-4">
              <UploadInput
                directory="data"
                name="Featured Image"
                :encrypt="true"
                :overwrite="false"
                v-model="dataToPost.featured_img"
                accept="*"
              />
            </div>
          </div>
        </div>
        <div class="card mt-8">
          <div class="card-header font-weight-bolder p-4">
            Additional File
          </div>
          <div class="card-body p-4">
            <div class="form-group mb-4">
              <UploadInput
                directory="data"
                name="Additional File"
                :encrypt="true"
                :overwrite="false"
                v-model="dataToPost.file"
                accept="*"
              />
              <div class="d-flex mt-2" v-if="dataToPost.file">
                <a
                  :href="dataToPost.file"
                  target="_blank"
                  class="btn btn-transparent p-0 text-success"
                >
                  <i class="fa fa-eye text-success"></i>
                  Preview
                </a>
                <div
                  @click="dataToPost.file = null"
                  target="_blank"
                  class="btn btn-transparent p-0 text-danger ml-2"
                >
                  <i class="fa fa-trash-alt text-danger"></i>
                  Remove file
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import Editor from '@tinymce/tinymce-vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import axios from 'axios';

@Component({
  components: { Panel, Editor, UploadInput }
})
export default class KepesertaanAdd extends Vue {
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
    height: 720,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  loading = false;

  dataToPost = {
    file: null,
    featured_img: null,
    icon: null,
    slug: '',
    type: 'kepesertaan',
    name: '',
    content: '',
    visibility: 'Public'
  };

  resetData() {
    this.dataToPost = {
      file: null,
      featured_img: null,
      icon: null,
      slug: '',
      type: 'kepesertaan',
      name: '',
      content: '',
      visibility: 'Public'
    };
  }

  async submit() {
    try {
      this.loading = true;
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.name);
      const data = await axios.post('informasi/add', this.dataToPost);
      this.loading = false;
      this.resetData();
      this.$router.push('/informasi/kepesertaan/detail/' + data.data.data);
    } catch (error) {
      this.loading = false;
    }
  }

  convertToSlug(Text: string) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
</script>
