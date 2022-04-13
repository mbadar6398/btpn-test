<template>
  <b-modal id="modal-add" hide-footer @hide="reset()" title="Add new informasi">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Name</label>
      <input
        class="form-control form-control-solid"
        v-model="dataToPost.name"
        type="text"
      />
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Description</label>
      <textarea
        class="form-control form-control-solid"
        v-model="dataToPost.content"
        rows="4"
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
    <div class="d-flex justify-content-center">
      <button @click="submit" class="btn btn-primary btn-block">
        <div v-if="!loading">
          <i class="fa fa-plus"></i>
          Add regulasi
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
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {}
})
export default class RegulasiAddModal extends Vue {
  loading = false;
  dataToPost = {
    slug: '',
    type: null,
    name: '',
    content: '',
    featured_img: null,
    icon: null,
    file: null,
    visibility: 'Public'
  };

  async submit() {
    try {
      this.loading = true;
      this.dataToPost.slug = this.convertToSlug(this.dataToPost.name);
      const data = await axios.post('regulasi/add', this.dataToPost);
      this.loading = false;
      this.$router.push('/regulasi/detail/' + data.data.data);
    } catch (error) {
      this.loading = false;
    }
  }

  async reset() {
    this.loading = false;
    this.dataToPost = {
      slug: '',
      type: null,
      name: '',
      content: '',
      featured_img: null,
      icon: null,
      file: null,
      visibility: 'Public'
    };
  }

  convertToSlug(Text: string) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
</script>
