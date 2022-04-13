<template>
  <b-modal id="modal-add" hide-footer title="Add new informasi">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Name</label>
      <input
        class="form-control form-control-solid"
        v-model="dataToPost.name"
        type="text"
      />
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
import axios from 'axios';

@Component({
  components: {}
})
export default class AddInformasiModal extends Vue {
  @Prop(String) readonly informasi_type: string;
  loading = false;
  dataToPost = {
    file: null,
    featured_img: null,
    icon: null,
    slug: '',
    type: '',
    name: '',
    content: '',
    visibility: 'Public'
  };

  async submit() {
    try {
      this.loading = true;
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.name);
      this.dataToPost.type = this.informasi_type;
      const data = await axios.post('informasi/add', this.dataToPost);
      this.loading = false;
      this.$router.push(
        '/informasi/' + this.informasi_type + '/detail/' + data.data.data
      );
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
