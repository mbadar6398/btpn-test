<template>
  <form action="" v-if="this.dataToPost.configuration">
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
          configuration.section_configuration.subtitle ? 'col-6' : 'col-12'
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
        :class="configuration.section_configuration.title ? 'col-6' : 'col-12'"
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
      <div class="col-12" v-if="configuration.section_configuration.content">
        <div class="form-group">
          <label class="font-weight-bolder" for="">
            Content
          </label>
          <textarea
            v-model="dataToPost.content"
            style="resize: none;"
            class="form-control form-control-solid"
            rows="5"
          ></textarea>
        </div>
      </div>
      <div
        :class="
          configuration.section_configuration.action_label ? 'col-6' : 'col-12'
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
        class="col-6"
        :class="
          configuration.section_configuration.action_title ? 'col-6' : 'col-12'
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
          configuration.section_configuration.image_mobile ? 'col-12' : 'col-6'
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
        :class="configuration.section_configuration.image ? 'col-12' : 'col-6'"
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
            ? 'col-12'
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
          configuration.section_configuration.background ? 'col-12' : 'col-6'
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import axios from 'axios';
import UploadInput from '@/components/UploadInput/UploadInput.vue';

@Component({
  components: { UploadInput },
  computed: {}
})
export default class SectionContent extends Vue {
  @Prop(String) readonly selected_section!: string;
  dataToPost: any = {};

  get configuration() {
    return this.dataToPost.configuration
      ? JSON.parse(this.dataToPost.configuration)
      : {};
  }

  @Watch('selected_section', { immediate: false, deep: false })
  async onSelectedSectionChanged() {
    this.getSectionsDetail();
  }

  async getSectionsDetail() {
    try {
      this.$emit('setFetchLoading', true);
      const { data } = await axios.get(
        'sections/get/detail/' + this.selected_section
      );
      this.dataToPost = data.data;
      this.$emit('setFetchLoading', false);
    } catch (error) {
      this.$emit('setFetchLoading', false);
    }
  }
}
</script>
