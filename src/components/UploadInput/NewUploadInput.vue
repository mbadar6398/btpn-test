<template>
  <div class="mt-2">
    <input
      type="file"
      class="d-none"
      ref="imageInput"
      id="imageINput"
      @change="uploadImage"
    />
    <div
      class="form-control form-control-solid d-flex p-0 justify-content-between align-items-center"
    >
      <span style="max-width: 150px; padding: 0 16px; white-space: nowrap;">
        <!-- {{ limit_characters(value, 30) }} -->
        Select file
      </span>
      <button
        id="kt_login_signin_submit"
        class="btn btn-primary btn-sm"
        @click.prevent="triggerUpload"
      >
        <div>
          <span>
            <i class="la la-upload"></i>
            Upload
          </span>
        </div>
      </button>
    </div>
    <!-- Uploaded files -->
    <div class="mt-8" style="max-height: 280px; overflow-y: auto;">
      <div
        class="d-flex justify-content-between align-items-center py-6"
        style="border-bottom: solid 1px #dddddd;"
        v-for="(item, index) in temp_files"
        :key="index"
      >
        <div>
          <span class="spinner spinner-success spinner-sm mr-6"></span>
          <span>Uploading...</span>
        </div>
      </div>
      <div
        class="mt-4 d-flex justify-content-between align-items-center py-2"
        style="border-bottom: solid 1px #dddddd;"
        v-for="(item, index) in files"
        :key="item.name"
      >
        <div>
          <div class="mr-2 d-inline-block">
            <i
              v-if="item.status === 'failed'"
              class="fa fa-exclamation-circle text-warning"
            ></i>
            <i v-else class="la la-check text-success"></i>
          </div>
          <span class="d-inline-block">
            {{ limit_characters(item.name, 40) }}
          </span>
        </div>
        <div class="d-flex align-items-center">
          <div
            @click="retryUpload(item, index)"
            class="cursor-pointer mr-4"
            v-if="item.status === 'failed'"
          >
            <i class="la la-redo-alt text-warning"></i>
          </div>
          <div @click="removeItem(index)" class="cursor-pointer">
            <i class="fa fa-times  text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import axios from 'axios';
@Component({
  components: {},
  computed: {}
})
export default class UploadInput extends Vue {
  @Prop(Array) value: any[];
  @Prop(String) directory: string;
  @Prop(String) type: string;
  @Prop(Boolean) multiple: boolean;
  @Prop(Boolean) loading: boolean;
  files: any = [];
  temp_files: any = [];

  @Watch('files', { immediate: false, deep: false })
  async onSelectedSectionChanged(val: any) {
    const value = val.filter((item: any) => item.status === 'success');
    this.$emit('input', value);
  }

  triggerUpload() {
    const elem: HTMLElement = this.$refs.imageInput as HTMLElement;
    elem.click();
  }

  uploadImage(event: any) {
    Array.from(event.target.files).forEach((item: any) => {
      const sameData = this.files.findIndex((i: any) => i.name === item.name);
      if (sameData !== -1) this.files.splice(sameData, 1);
      const temp_file = {
        name: item.name,
        status: 'loading',
        type: 'unknown',
        item: item
      };
      this.temp_files.unshift(temp_file);

      const formData = new FormData();
      formData.append('file', item);
      formData.append('encrypt', 'false');
      formData.append('overwrite', 'true');
      formData.append('directory', this.directory ? this.directory : '');
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios
        .post('/upload', formData, { headers })
        .then((resp) => {
          temp_file.status = 'success';
          temp_file.name = resp.data.data.name;
          temp_file.type = resp.data.data.type;
          this.temp_files.splice(0, 1);
          this.files.unshift(temp_file);
        })
        .catch(() => {
          temp_file.status = 'failed';
          this.temp_files.splice(0, 1);
          this.files.unshift(temp_file);
        });
    });
  }

  async retryUpload(item: any, index: number) {
    this.files.splice(index, 1);

    const temp_file = {
      name: item.name,
      status: 'loading',
      type: 'unknown',
      item: item.item
    };
    this.temp_files.unshift(temp_file);

    const formData = new FormData();
    formData.append('file', item.item);
    formData.append('encrypt', 'false');
    formData.append('overwrite', 'true');
    formData.append('directory', this.directory ? this.directory : '');
    const headers = { 'Content-Type': 'multipart/form-data' };
    try {
      const resp = await axios.post('/upload', formData, { headers });
      temp_file.status = 'success';
      temp_file.name = resp.data.data.name;
      temp_file.type = resp.data.data.type;
      this.temp_files.splice(0, 1);
      this.files.unshift(temp_file);
    } catch (error) {
      temp_file.status = 'failed';
      this.temp_files.splice(0, 1);
      this.files.unshift(temp_file);
    }
  }

  removeItem(index: number) {
    this.files.splice(index, 1);
  }

  limit_characters(text: string, number: number) {
    return text.length > number ? text.substring(0, number) + '...' : text;
  }
}
</script>
