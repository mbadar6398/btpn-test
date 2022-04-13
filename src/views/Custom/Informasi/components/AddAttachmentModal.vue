<template>
  <b-modal id="modal-upload" hide-footer title="Add new informasi">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Name</label>
      <input
        class="form-control form-control-solid"
        v-model="dataToPost.file_name"
        type="text"
      />
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Description</label>
      <textarea
        rows="4"
        class="form-control form-control-solid"
        v-model="dataToPost.description"
        type="text"
      ></textarea>
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Visibility</label>
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
    <div class="form-group">
      <label class="font-weight-bolder" for="">File</label>
      <UploadInput
        directory="data"
        name="Additional File"
        :encrypt="true"
        :overwrite="false"
        v-model="dataToPost.file_url"
        accept="*"
      />
      <div class="d-flex mt-2" v-if="dataToPost.file_url">
        <a
          :href="dataToPost.file_url"
          target="_blank"
          class="btn btn-transparent p-0 text-success"
        >
          <i class="fa fa-eye text-success"></i>
          Preview
        </a>
        <div
          @click="dataToPost.file_url = null"
          target="_blank"
          class="btn btn-transparent p-0 text-danger ml-2"
        >
          <i class="fa fa-trash-alt text-danger"></i>
          Remove file
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button @click="submit" class="btn btn-primary btn-block">
        <div v-if="!loading">
          <i class="fa fa-plus"></i>
          Add informasi
        </div>

        <div class="d-flex align-items-center justify-content-center" v-else>
          <span
            class="spinner spinner-track spinner-primary spinner-sm mr-6"
          ></span>
          <span class="ml-2">Loading...</span>
        </div>
      </button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import axios from 'axios';

@Component({
  components: { UploadInput }
})
export default class AddInformasiModal extends Vue {
  @Prop(String) readonly type: string;
  @Prop(String) readonly parent_id: string;
  loading = false;
  dataToPost = {
    parent_id: '',
    type: 'informasi',
    file_name: '',
    file_url: '',
    description: '',
    visibility: 'Public'
  };

  async submit() {
    try {
      this.loading = true;
      this.dataToPost.type = this.type;
      this.dataToPost.parent_id = this.parent_id;
      await axios.post('attachments/upload', this.dataToPost);
      this.loading = false;
      this.$root.$emit('bv::hide::modal', 'modal-upload');
      this.$emit('refresh');
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
