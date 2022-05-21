<template>
  <b-modal
    id="modal-update-card"
    hide-footer
    size="lg"
    title="Update card"
    @hide="onModalHide"
    @shown="onModalShown"
  >
    <div v-if="loading_data">
      <div class="text-center">
        <span class="spinner spinner-success mr-6"></span>
        <span class="ml-2">Memuat...</span>
      </div>
    </div>
    <ValidationObserver v-else ref="observer" v-slot="{ handleSubmit }">
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
          <div v-if="dataToPost.file">
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
          <div v-if="dataToPost.image">
            <a
              class="text-danger font-weight-bolder cursor-pointer mt-2"
              @click="dataToPost.image = null"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Hapus
            </a>
          </div>
          <img
            :src="dataToPost.image ? dataToPost.image : `#`"
            class="img-fluid mt-4"
            alt=""
          />
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
          />
          <div v-if="dataToPost.icon">
            <a
              class="text-danger font-weight-bolder cursor-pointer mt-2"
              @click="dataToPost.icon = null"
            >
              <i class="fa fa-trash-alt text-danger"></i>
              Hapus
            </a>
          </div>
          <img
            :src="dataToPost.icon ? dataToPost.icon : `#`"
            class="img-fluid mt-4"
            alt=""
          />
        </div>

        <div class="form-group d-flex justify-content-end">
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-success btn-sm font-weight-bolder"
          >
            <div v-if="!loading">
              <i class="la la-save"></i>
              Simpan Perubahan
            </div>

            <div
              class="d-flex align-items-center justify-content-center"
              v-else
            >
              <span
                class="spinner spinner-track spinner-success spinner-sm mr-6"
              ></span>
              <span class="ml-2">Loading...</span>
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
export default class CardsUpdateModal extends Vue {
  @Prop(String) selected_card: string;
  @Prop(Object) selected_section: any;

  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  loading = false;
  loading_data = true;
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
  get configuration() {
    return JSON.parse(this.selected_section.configuration);
  }
  get fields() {
    return this.configuration.fields;
  }

  async submit() {
    this.loading = true;
    await axios.put('/cards/update/' + this.selected_card, this.dataToPost);
    this.loading = false;
    this.$root.$emit('bv::hide::modal', 'modal-update-card');
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
      section_id: this.selected_section.id
    };
    this.$refs.observer.reset();
    this.loading_data = true;
  }

  async onModalShown() {
    this.doShow = true;
    this.loading_data = true;
    const { data } = await axios.get(
      '/cards/get/detail?id=' + this.selected_card
    );
    this.dataToPost.title = data.data.title;
    this.dataToPost.subtitle = data.data.subtitle;
    this.dataToPost.description = data.data.description;
    this.dataToPost.content = data.data.content;
    this.dataToPost.action_url = data.data.action_url;
    this.dataToPost.action_label = data.data.action_label;
    this.dataToPost.file = data.data.file;
    this.dataToPost.image = data.data.image;
    this.dataToPost.icon = data.data.icon;
    this.dataToPost.section_id = data.data.section_id;
    this.loading_data = false;
  }

  onModalHide() {
    this.doShow = false;
    this.resetData();
  }
}
</script>
