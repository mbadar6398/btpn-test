<template>
  <div>
    <input
      type="file"
      class="d-none"
      ref="imageInput"
      :accept="accept"
      id="imageINput"
      @change="uploadImage"
      :disabled="uploadLoading"
    />
    <ValidationProvider
      v-slot="{ errors, classes }"
      :name="name ? name : 'File'"
      :rules="{ required }"
    >
      <input type="text" class="d-none" v-model="value" :required="required" />
      <div
        :class="classes"
        class="form-control form-control-solid d-flex p-0 justify-content-between align-items-center"
      >
        <span style="max-width: 150px; padding: 0 16px; white-space: nowrap;">
          <!-- {{ limit_characters(value, 30) }} -->
          ...
        </span>
        <button
          id="kt_login_signin_submit"
          class="btn btn-primary btn-sm"
          @click.prevent="triggerUpload"
          :disabled="uploadLoading"
        >
          <div v-if="!uploadLoading">
            <span>
              <i class="la la-upload"></i>
              Upload
            </span>
          </div>
          <div class="d-flex align-items-center justify-content-center" v-else>
            <span
              class="spinner spinner-track spinner-primary spinner-sm mr-6"
            ></span>
            <span class="ml-2">Uploading...</span>
          </div>
        </button>
      </div>
      <span class="form-error-message">{{ errors[0] }}</span>
    </ValidationProvider>
    <div class="mt-2" v-if="!uploadLoading">
      <div class="d-flex align-items-center" v-if="successUpload">
        <span><i class="la la-check text-primary mr-2 mt-1"></i></span>
        <span>Success uploading</span>
      </div>
      <div class="d-flex align-items-center" v-if="failedUpload">
        <span><i class="la la-times text-danger mr-2 mt-1"></i></span>
        <span>
          Upload failed, Please
          <span @click="uploadImage" class="text-danger cursor-pointer">
            Retry
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
extend('email', email);
extend('required', required);
@Component({
  components: {},
  computed: {}
})
export default class UploadInput extends Vue {
  @Prop(String) directory: string;
  @Prop(Boolean) encrypt: boolean;
  @Prop(Boolean) overwrite: boolean;
  @Prop(Boolean) loading: boolean;
  @Prop(Boolean) required: boolean;
  @Prop(String) name: string;
  @Prop(String) accept: string;

  value = '';
  uploadLoading = false;
  failedUpload = false;
  successUpload = false;
  failedUploadFile: any = null;

  triggerUpload() {
    const elem: HTMLElement = this.$refs.imageInput as HTMLElement;
    elem.click();
  }

  async uploadImage() {
    const elem: HTMLFormElement = this.$refs.imageInput as HTMLFormElement;
    this.failedUploadFile = null;
    this.uploadLoading = true;
    this.failedUpload = false;
    this.successUpload = false;
    const encrypt = this.encrypt ? 'true' : 'false';
    const overwrite = this.overwrite ? 'true' : 'false';
    const file = elem.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', this.directory);
    formData.append('encrypt', encrypt);
    formData.append('overwrite', overwrite);
    const headers = { 'Content-Type': 'multipart/form-data' };
    try {
      const res = await axios.post('/upload', formData, { headers });
      this.$emit('input', res.data.data.url);
      this.value = res.data.data.url;
      this.uploadLoading = false;
      this.successUpload = true;
      this.failedUpload = false;
    } catch (error) {
      this.failedUploadFile = file;
      this.failedUpload = true;
      this.successUpload = false;
      this.uploadLoading = false;
    }
  }

  limit_characters(text: string, number: number) {
    return text.substring(0, number) + '...';
  }
}
</script>
