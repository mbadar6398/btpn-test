<template>
  <b-modal
    @hide="reset"
    @shown="onModalShown"
    id="modal-update"
    hide-footer
    title="Add new informasi"
  >
    <div v-if="!loadingFetch">
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
        <button @click="submit" class="btn btn-success btn-block">
          <div v-if="!loading">
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
      <p class="text-center my-8">Loading...</p>
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
export default class UpdateAttachment extends Vue {
  @Prop(String) readonly type: string;
  @Prop(String) readonly parent_id: string;
  @Prop(String) readonly selected_attachment: string;
  loading = false;
  loadingFetch = false;
  dataToPost = {
    id: '',
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
      await axios.put(
        'attachments/update/' + this.dataToPost.id,
        this.dataToPost
      );
      this.loading = false;
      this.$root.$emit('bv::hide::modal', 'modal-update');
      this.$emit('refresh');
    } catch (error) {
      this.loading = false;
    }
  }

  reset() {
    this.loadingFetch = true;
    this.loading = false;
    this.dataToPost = {
      id: '',
      parent_id: '',
      type: 'informasi',
      file_name: '',
      file_url: '',
      description: '',
      visibility: 'Public'
    };
  }

  async onModalShown() {
    this.loadingFetch = true;
    const { data } = await axios.get(
      'attachments/get/' + this.selected_attachment
    );
    this.dataToPost.id = data.data.id;
    this.dataToPost.parent_id = data.data.parent_id;
    this.dataToPost.type = data.data.type;
    this.dataToPost.file_name = data.data.file_name;
    this.dataToPost.file_url = data.data.file_url;
    this.dataToPost.description = data.data.description;
    this.dataToPost.visibility = data.data.visibility;
    this.loadingFetch = false;
  }

  convertToSlug(Text: string) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
</script>
