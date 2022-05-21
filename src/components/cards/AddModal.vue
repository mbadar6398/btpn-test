<template>
  <b-modal
    id="modal-add-card"
    hide-footer
    size="lg"
    title="Buat card baru"
    @hide="onModalHide"
    @shown="onModalShown"
  >
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form refs="updateForm" novalidate @submit.prevent="handleSubmit(submit)">
        <!-- Title -->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.title"
        >
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Title"
            rules="required"
          >
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Title
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.title"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- Subtitle -->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.subtitle"
        >
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Subtitle"
            rules="required"
          >
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Subtitle
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.subtitle"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- Description -->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.description"
        >
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Description"
            rules="required"
          >
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Description
            </label>
            <textarea
              rows="5"
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.description"
            ></textarea>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- Description Content -->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.content"
        >
          <label class="font-weight-bolder" for="">
            <span class="text-danger mr-1">*</span>
            Content
          </label>
          <Editor
            api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
            v-model="dataToPost.content"
            v-if="doShow"
            :init="tinyMceConfig"
          />
        </div>

        <!-- Url-->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.action_url"
        >
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Action URL"
            rules="required"
          >
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Action Url
              <span class="font-weight-normal text-sm">
                (Example: https://facebook.com/)
              </span>
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.action_url"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- Label-->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.action_label"
        >
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Action label"
            rules="required"
          >
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Action Label
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.action_label"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- File-->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.file"
        >
          <label class="font-weight-bolder" for="">
            <span class="text-danger mr-1">*</span>
            File
          </label>
          <UploadInput
            directory="data"
            name="File"
            :encrypt="true"
            :overwrite="false"
            v-model="dataToPost.file"
            accept="*"
          />
          <img
            :src="dataToPost.file ? dataToPost.file : `#`"
            class="img-fluid mt-4"
            alt=""
          />
          <div v-if="dataToPost.file" class="mt-4">
            <a
              class="text-success font-weight-bolder mr-4 cursor-pointer"
              target="_blank"
              :href="dataToPost.file"
            >
              Preview file
            </a>
            <a
              class="text-danger font-weight-bolder cursor-pointer"
              @click="dataToPost.file = null"
            >
              Hapus file
            </a>
          </div>
        </div>

        <!-- Image-->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.image"
        >
          <label class="font-weight-bolder" for="">
            <span class="text-danger mr-1">*</span>
            Image
          </label>
          <UploadInput
            directory="data"
            name="Image"
            :encrypt="true"
            :overwrite="false"
            v-model="dataToPost.image"
            accept="image/*"
          />
          <img
            :src="dataToPost.image ? dataToPost.image : `#`"
            class="img-fluid mt-4"
            alt=""
          />
          <div v-if="dataToPost.image" class="mt-4">
            <a
              class="text-danger font-weight-bolder cursor-pointer mt-2"
              @click="dataToPost.image = null"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Hapus gambar
            </a>
          </div>
        </div>

        <!-- Icon-->
        <div
          class="form-group"
          v-if="configuration.section_card_configuration.icon"
        >
          <label class="font-weight-bolder" for="">
            <span class="text-danger mr-1">*</span>
            Icon
          </label>
          <UploadInput
            directory="data"
            name="Icon"
            :encrypt="true"
            :overwrite="false"
            v-model="dataToPost.icon"
            accept="image/*"
            required
          />
          <img
            :src="dataToPost.icon ? dataToPost.icon : `#`"
            class="img-fluid mt-4"
            alt=""
          />
          <div v-if="dataToPost.icon" class="mt-4">
            <a
              class="text-danger font-weight-bolder cursor-pointer mt-2"
              @click="dataToPost.icon = null"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Hapus gambar
            </a>
          </div>
        </div>

        <div class="form-group d-flex justify-content-center">
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary btn-sm font-weight-bolder"
          >
            <div v-if="!loading">
              <i class="la la-plus"></i>
              Buat card baru
            </div>

            <div
              class="d-flex align-items-center justify-content-center"
              v-else
            >
              <span
                class="spinner spinner-track spinner-success spinner-sm mr-6"
              ></span>
              <span class="ml-2">Memuat...</span>
            </div>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import 'vue2-datepicker/index.css';
import Editor from '@tinymce/tinymce-vue';
import { ValidationObserver } from 'vee-validate';
import UploadInput from '../UploadInput/UploadInput.vue';
import axios from 'axios';

@Component({
  components: {
    Editor,
    UploadInput
  },
  computed: {}
})
export default class CardsAddModal extends Vue {
  @Prop(Object) selected_section: any;
  @Prop(Object) configuration: any;
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  loading = false;
  doShow = false;

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
    height: 500,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  dataToPost = {
    title: null,
    subtitle: null,
    description: null,
    content: null,
    action_url: null,
    action_label: null,
    file: null,
    image: null,
    icon: null,
    section_id: null
  };

  async submit() {
    this.loading = true;
    this.dataToPost.section_id = this.selected_section.id;
    await axios.post('/cards/add', this.dataToPost);
    this.loading = false;
    this.$root.$emit('bv::hide::modal', 'modal-add-card');
    this.$emit('refresh');
  }

  resetData() {
    this.dataToPost = {
      title: null,
      subtitle: null,
      description: null,
      content: null,
      action_url: null,
      action_label: null,
      file: null,
      image: null,
      icon: null,
      section_id: null
    };
    this.$refs.observer.reset();
  }

  onModalHide() {
    this.doShow = false;
    this.resetData();
  }

  onModalShown() {
    this.doShow = true;
  }
}
</script>
