<template>
  <b-modal
    id="modal-add"
    hide-footer
    title="Buat halaman baru"
    @hide="onModalHide"
  >
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form refs="updateForm" novalidate @submit.prevent="handleSubmit(submit)">
        <!-- Name -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Name"
            rules="required"
          >
            <label
              :class="errors[0] && 'text-danger'"
              class="font-weight-bolder"
              for=""
            >
              <span class="text-danger mr-1">*</span>
              Nama halaman
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.name"
            />
          </ValidationProvider>
        </div>

        <!-- Type -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Jenis halaman"
            rules="required"
          >
            <label
              :class="errors[0] && 'text-danger'"
              class="font-weight-bolder"
              for=""
            >
              <span class="text-danger mr-1">*</span>
              Jenis halaman
            </label>
            <select
              @change="dataToPost.template = null"
              :class="classes"
              v-model="dataToPost.type"
              class="form-control form-control-solid"
            >
              <option value="Custom">Custom</option>
              <option value="Template">Template</option>
            </select>
          </ValidationProvider>
        </div>

        <!-- Template name -->
        <div class="form-group" v-if="dataToPost.type === 'Template'">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Nama template"
            rules="required"
          >
            <label
              :class="errors[0] && 'text-danger'"
              class="font-weight-bolder"
              for=""
            >
              <span class="text-danger mr-1">*</span>
              Nama template
            </label>
            <input
              type="text"
              :class="classes"
              v-model="dataToPost.template"
              class="form-control form-control-solid"
              required
            />
          </ValidationProvider>
        </div>

        <!-- Slug -->
        <div class="form-group">
          <ValidationProvider
            v-slot="{ errors, classes }"
            name="Slug"
            rules="required"
          >
            <label
              :class="errors[0] && 'text-danger'"
              class="font-weight-bolder"
              for=""
            >
              <span class="text-danger mr-1">*</span>
              Slug
            </label>
            <input
              type="text"
              :class="classes"
              class="form-control form-control-solid"
              required
              v-model="dataToPost.slug"
            />
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label class="font-weight-bolder" for="">Status</label>
          <select
            class="form-control form-control-solid"
            v-model="dataToPost.visibility"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
        <div class="d-flex justify-content-center">
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-success btn-sm font-weight-bolder"
          >
            <div v-if="!loading">
              <i class="fa fa-plus"></i>
              Buat halaman
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
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {},
  computed: {}
})
export default class AddModal extends Vue {
  loading = false;

  dataToPost = {
    name: '',
    slug: '',
    type: 'Custom',
    visibility: 'Public',
    template: null,
    title_tag: null,
    meta_description: null,
    meta_keywords: null
  };

  async submit() {
    try {
      this.loading = true;
      await axios.post('page/create', this.dataToPost);
      this.loading = false;
      this.$root.$emit('bv::hide::modal', 'modal-add');
      this.$emit('refresh');
    } catch (error) {
      this.loading = false;
    }
  }

  onModalHide() {
    this.dataToPost = {
      name: '',
      slug: '',
      type: 'Custom',
      visibility: 'Public',
      template: null,
      title_tag: null,
      meta_description: null,
      meta_keywords: null
    };
  }
}
</script>
