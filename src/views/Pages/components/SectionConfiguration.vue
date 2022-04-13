<template>
  <b-modal
    id="modal-section-configuration"
    hide-footer
    title="Section Configuration"
    @shown="onModalShown"
    @hide="onModalHide"
  >
    <div v-if="!fetchLoading">
      <div class="card">
        <div
          class="card-header bg-dark text-white font-weight-bolder px-4 py-4"
        >
          Section Configuration
        </div>
        <div class="card-body px-4 py-4">
          <div class="row">
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Section Type
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <select
                      class="form-control form-control-solid"
                      name=""
                      id=""
                      v-model="section_type"
                    >
                      <option value="default">Default</option>
                      <option value="cards">Cards</option>
                      <option value="sliders">Sliders</option>
                      <option value="informasi">Informasi</option>
                      <option value="regulasi">Regulasi</option>
                    </select>
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Title
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      v-model="configuration.section_configuration.title"
                      type="checkbox"
                      name="select"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Subtitle
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.subtitle"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Description
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.description"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Content
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.content"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Action URL
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.action_url"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Action Label
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.action_label"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Youtube URL
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.youtube_url"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Image
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.image"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Image Mobile
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.image_mobile"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Background
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_configuration.background"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Background Mobile
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="
                        configuration.section_configuration.background_mobile
                      "
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="section_type === 'cards'" class="card mt-8">
        <div
          class="card-header bg-dark text-white font-weight-bolder px-4 py-4"
        >
          Section Card Configuration
        </div>
        <div class="card-body px-4 py-4">
          <div class="row">
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Title
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_card_configuration.title"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Subtitle
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="
                        configuration.section_card_configuration.subtitle
                      "
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Description
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="
                        configuration.section_card_configuration.description
                      "
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Content
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_card_configuration.content"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Action URL
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="
                        configuration.section_card_configuration.action_url
                      "
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Action Label
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="
                        configuration.section_card_configuration.action_label
                      "
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  File
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_card_configuration.file"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Image
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_card_configuration.image"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div
                class="d-flex align-items-center justify-content-between py-2"
                style="border-bottom: solid 1px #e2e2e2;"
              >
                <span class="font-weight-bolder mb-0 mr-4">
                  Icon
                </span>
                <span class="switch switch-primary switch-outline">
                  <label>
                    <input
                      type="checkbox"
                      name="select"
                      v-model="configuration.section_card_configuration.icon"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group d-flex justify-content-center mt-8">
        <button
          @click="submit"
          :disabled="submitLoading"
          class="btn btn-success btn-sm font-weight-bolder"
        >
          <div v-if="!submitLoading">
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
      </div>
    </div>
    <div v-else>
      <p class="text-center">Loading...</p>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MainConfig from '@/config/config';
import axios from 'axios';
@Component({
  components: {},
  computed: {}
})
export default class SectionConfiguration extends Vue {
  @Prop(String) readonly selected_section!: string;
  submitLoading = false;
  dataToPost: any = {};
  fetchLoading = true;
  section_type = 'default';
  configuration = {
    section_configuration: MainConfig.section_configuration,
    section_card_configuration: MainConfig.section_card_configuration
  };

  async onModalShown() {
    await this.getSectionsDetail();
  }

  onModalHide() {
    this.fetchLoading = true;
  }

  async getSectionsDetail() {
    try {
      this.fetchLoading = true;
      const { data } = await axios.get(
        'sections/get/detail/' + this.selected_section
      );
      this.dataToPost = data.data;
      this.section_type = data.data.type;
      this.fetchLoading = false;
      this.configuration = JSON.parse(this.dataToPost.configuration);
    } catch (error) {
      this.fetchLoading = false;
    }
  }

  async submit() {
    try {
      this.submitLoading = true;
      const config_string = JSON.stringify(this.configuration);
      await axios.put('sections/config/update/' + this.selected_section, {
        configuration: config_string,
        type: this.section_type
      });
      this.submitLoading = false;
      this.$root.$emit('bv::hide::modal', 'modal-section-configuration');
      this.$emit('refresh');
    } catch (error) {
      this.submitLoading = false;
    }
  }
}
</script>
