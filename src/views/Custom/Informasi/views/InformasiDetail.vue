<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <input
          class="form-control form-control-lg mb-6"
          type="text"
          placeholder=""
          v-model="dataToPost.name"
        />
        <Attachments
          v-if="dataToPost.id"
          :type="dataToPost.type"
          :parent_id="dataToPost.id"
        />
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
            <button
              @click="remove"
              :disabled="loading"
              class="btn btn-danger btn-sm btn-block"
            >
              <div v-if="!loading">
                <i class="la la-trash-alt"></i>
                Delete Informasi
              </div>

              <div
                class="d-flex align-items-center justify-content-center"
                v-else
              >
                <span
                  class="spinner spinner-track spinner-danger spinner-sm mr-6"
                ></span>
                <span class="ml-2">Loading...</span>
              </div>
            </button>
            <div class="form-group mt-8">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import Editor from '@tinymce/tinymce-vue';
import AddAttachmentModal from '../components/AddAttachmentModal.vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import Attachments from '@/views/attachments/views/Attachments.vue';
import axios from 'axios';

@Component({
  components: { Panel, Editor, UploadInput, AddAttachmentModal, Attachments }
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
    id: null,
    file: null,
    featured_img: null,
    icon: null,
    slug: '',
    type: 'kepesertaan',
    name: '',
    content: '',
    visibility: 'Public'
  };

  get selected_id() {
    return this.$route.params.id;
  }

  mounted() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.loading = true;
      const { data } = await axios.get(
        'informasi/get/detail/' + this.selected_id
      );
      this.dataToPost.id = data.data.id;
      this.dataToPost.file = data.data.file;
      this.dataToPost.featured_img = data.data.featured_img;
      this.dataToPost.icon = data.data.icon;
      this.dataToPost.slug = data.data.slug;
      this.dataToPost.type = data.data.type;
      this.dataToPost.name = data.data.name;
      this.dataToPost.content = data.data.content;
      this.dataToPost.visibility = data.data.visibility;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.$router.push('/404');
    }
  }

  async submit() {
    try {
      this.loading = true;
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.name);
      await axios.put('informasi/update/' + this.selected_id, this.dataToPost);
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  convertToSlug(Text: string) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  async remove() {
    this.$swal({
      title: 'Apakah anda yakin ingin menghapus?',
      text: 'Anda tidak dapat mengembalikan aksi ini',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Saya mengerti',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Batalkan`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.loading = true;
          await axios.delete('informasi/delete/' + this.selected_id);
          this.$router.push('/informasi');
        } catch (error) {
          this.loading = false;
        }
      }
    });
  }
}
</script>
