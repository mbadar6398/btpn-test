<template>
  <div>
    <Panel :title="panelTitle" :subtitle="'Section Information'" class="mb-8">
      <template v-slot:toolbar>
        <router-link to="/pages" class="btn btn-secondary btn-sm mr-4">
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-list font-size-sm mb-0 mr-1"></i>
            Pages List
          </span>
        </router-link>
        <button
          class="btn btn-warning btn-sm mr-4"
          v-b-modal.modal-section-configuration
          :disabled="fetchLoading"
        >
          <span class="d-flex align-items-center font-weight-bolder text-dark">
            <i class="fa fa-cog font-size-sm mb-0 mr-1 text-dark"></i>
          </span>
        </button>
        <button
          class="btn btn-danger btn-sm mr-4"
          @click="deleteSection(selected_section)"
          :disabled="fetchLoading"
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-trash-alt font-size-sm mb-0 mr-1"></i>
          </span>
        </button>
        <button
          class="btn btn-primary btn-sm mr-4"
          v-b-modal.modal-section-configuration
          :disabled="fetchLoading || Number(dataToPost.order_seq) === 1"
          @click="increaseSection(selected_section)"
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-chevron-up"></i>
          </span>
        </button>
        <button
          class="btn btn-primary btn-sm mr-4"
          v-b-modal.modal-section-configuration
          @click="decreaseSection(selected_section)"
          :disabled="
            fetchLoading || Number(dataToPost.order_seq) === total_sections
          "
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fa fa-chevron-down"></i>
          </span>
        </button>
        <button
          class="btn btn-success btn-sm"
          @click="saveChanges"
          :disabled="fetchLoading || saveLoading"
        >
          <div v-if="!saveLoading">
            <i class="fa fa-save"></i>
            Save changes
          </div>

          <div class="d-flex align-items-center justify-content-center" v-else>
            <span
              class="spinner spinner-track spinner-success spinner-sm mr-6"
            ></span>
            <span class="ml-2">Loading...</span>
          </div>
        </button>
      </template>

      <template v-slot:body v-if="!fetchLoading">
        <form action="">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Section name
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="dataToPost.name"
                  class="form-control form-control-solid"
                  type="text"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Visibility
                  <span class="text-danger">*</span>
                </label>
                <select
                  class="form-control form-control-solid"
                  v-model="dataToPost.visibility"
                  name=""
                  id=""
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.subtitle
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.title"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Title
                </label>
                <input
                  v-model="dataToPost.title"
                  class="form-control form-control-solid"
                  type="text"
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.title ? 'col-6' : 'col-12'
              "
              v-if="configuration.section_configuration.subtitle"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Subtitle
                </label>
                <input
                  class="form-control form-control-solid"
                  type="text"
                  v-model="dataToPost.subtitle"
                />
              </div>
            </div>
            <div
              class="col-12"
              v-if="configuration.section_configuration.description"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Description
                </label>
                <textarea
                  style="resize: none;"
                  class="form-control form-control-solid"
                  rows="5"
                  v-model="dataToPost.description"
                ></textarea>
              </div>
            </div>
            <div
              class="col-12"
              v-if="configuration.section_configuration.content"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Content
                </label>

                <Editor
                  api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
                  v-model="dataToPost.content"
                  :init="{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'textcolor advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'forecolor backcolor | undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
                  }"
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.action_label
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.action_url"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Action URL
                </label>
                <input
                  class="form-control form-control-solid"
                  type="text"
                  v-model="dataToPost.action_url"
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.action_url
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.action_label"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Action Label
                </label>
                <input
                  v-model="dataToPost.action_label"
                  class="form-control form-control-solid"
                  type="text"
                />
              </div>
            </div>
            <div
              class="col-12"
              v-if="configuration.section_configuration.youtube_url"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Youtube URL
                </label>
                <input
                  v-model="dataToPost.embed_url"
                  class="form-control form-control-solid"
                  type="text"
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.image_mobile
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.image"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
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
                  v-if="dataToPost.image"
                  class="img-fluid"
                  :src="dataToPost.image"
                  style="max-height: 240px;"
                  alt=""
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.image ? 'col-6' : 'col-12'
              "
              v-if="configuration.section_configuration.image_mobile"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Image Mobile
                </label>
                <UploadInput
                  directory="data"
                  name="Image"
                  :encrypt="true"
                  :overwrite="false"
                  v-model="dataToPost.image_mobile"
                  accept="image/*"
                />
                <img
                  v-if="dataToPost.image_mobile"
                  class="img-fluid"
                  :src="dataToPost.image_mobile"
                  style="max-height: 240px;"
                  alt=""
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.background_mobile
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.background"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Background
                </label>
                <UploadInput
                  directory="data"
                  name="Image"
                  :encrypt="true"
                  :overwrite="false"
                  v-model="dataToPost.background"
                  accept="image/*"
                />
                <img
                  v-if="dataToPost.background"
                  class="img-fluid"
                  :src="dataToPost.background"
                  style="max-height: 240px;"
                  alt=""
                />
              </div>
            </div>
            <div
              :class="
                configuration.section_configuration.background
                  ? 'col-6'
                  : 'col-12'
              "
              v-if="configuration.section_configuration.background_mobile"
            >
              <div class="form-group">
                <label class="font-weight-bolder" for="">
                  Background Mobile
                </label>
                <UploadInput
                  directory="data"
                  name="Image"
                  :encrypt="true"
                  :overwrite="false"
                  v-model="dataToPost.background_mobile"
                  accept="image/*"
                />
                <img
                  v-if="dataToPost.background_mobile"
                  class="img-fluid"
                  :src="dataToPost.background_mobile"
                  style="max-height: 240px;"
                  alt=""
                />
              </div>
            </div>
          </div>
        </form>
        <SectionConfiguration
          @refresh="getSectionsDetail"
          :selected_section="selected_section"
        />
      </template>
    </Panel>
    <Sliders
      :selected_section="dataToPost"
      v-if="dataToPost.type === 'sliders' && !fetchLoading"
    />
    <Cards
      :configuration="configuration"
      :selected_section="dataToPost"
      v-if="dataToPost.type === 'cards' && !fetchLoading"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import SectionConfiguration from './SectionConfiguration.vue';
import MainConfig from '@/config/config';
import axios from 'axios';
import Sliders from '@/components/sliders/Sliders.vue';
import Cards from '@/components/cards/Cards.vue';
import Editor from '@tinymce/tinymce-vue';

@Component({
  components: {
    Panel,
    UploadInput,
    SectionConfiguration,
    Sliders,
    Cards,
    Editor
  },
  computed: {}
})
export default class SectionInformation extends Vue {
  @Prop(String) readonly selected_section!: string;
  @Prop(String) readonly pageId!: string;
  dataToPost: any = {};
  fetchLoading = true;
  total_sections = 0;
  saveLoading = false;
  configuration = {
    section_configuration: MainConfig.section_configuration,
    section_card_configuration: MainConfig.section_card_configuration
  };

  @Watch('selected_section', { immediate: false, deep: false })
  async onSelectedSectionChanged() {
    this.getSectionsDetail();
  }

  get panelTitle() {
    if (!this.selected_section) {
      return 'Please select section';
    } else {
      return this.fetchLoading ? 'Loading...' : this.dataToPost.name;
    }
  }

  async getSectionsDetail() {
    try {
      this.fetchLoading = true;
      const { data } = await axios.get(
        'sections/get/detail/' + this.selected_section
      );
      const total_sections = await axios.get(
        'sections/total/page/' + this.pageId
      );
      if (data.data === null) {
        this.dataToPost = null;
      }
      this.total_sections = total_sections.data.data;
      this.dataToPost = data.data;
      this.fetchLoading = false;
      this.configuration = JSON.parse(this.dataToPost.configuration);
    } catch (error) {
      this.fetchLoading = false;
    }
  }

  async increaseSection(id: string) {
    try {
      this.fetchLoading = true;
      await axios.put('/sections/increase-order/' + id, {
        page_id: this.pageId
      });
      this.$emit('refresh');
      await this.getSectionsDetail();
    } catch (error) {
      this.fetchLoading = false;
    }
  }

  async decreaseSection(id: string) {
    try {
      this.fetchLoading = true;
      await axios.put('/sections/decrease-order/' + id, {
        page_id: this.pageId
      });
      this.$emit('refresh');
      await this.getSectionsDetail();
    } catch (error) {
      this.fetchLoading = false;
    }
  }

  async deleteSection(id: string) {
    this.$swal({
      title: 'Are you sure want to delete this section?',
      text: 'Your action could not be reverted',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.fetchLoading = true;
          await axios.delete('/sections/delete/' + id);
          this.$emit('refresh');
          this.$emit('select_section');
          await this.getSectionsDetail();
        } catch (error) {
          this.fetchLoading = false;
        }
      }
    });
  }

  async saveChanges() {
    this.saveLoading = true;
    await axios.put(
      'sections/update/' + this.selected_section,
      this.dataToPost
    );
    this.saveLoading = false;
    this.getSectionsDetail();
  }
}
</script>
