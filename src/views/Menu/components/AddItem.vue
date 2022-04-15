<template>
  <b-modal
    id="modal-add-page"
    hide-footer
    title="Add new page into menu"
    @shown="onModalShown"
    @hide="onModalHide"
  >
    <div class="mb-4">
      <label class="font-weight-bolder" for="">
        Select type
        <span class="text-danger">*</span>
      </label>
      <select
        v-model="dataToPost.type"
        @change="onSelectType"
        class="form-control form-control-solid"
        name=""
        id=""
      >
        <option value="page">Page</option>
        <option value="link">External Link</option>
        <option value="login">Login</option>
        <option value="no-action">No Action</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="font-weight-bolder" for="">
        Name
        <span class="text-danger">*</span>
      </label>
      <input
        v-model="dataToPost.name"
        class="form-control form-control-solid"
        type="text"
      />
    </div>
    <div class="mb-4" v-if="dataToPost.type === 'page'">
      <label class="font-weight-bolder" for="">
        Select page
        <span class="text-danger">*</span>
      </label>
      <v-select
        v-model="dataToPost.page"
        :loading="loading_fetch"
        :options="pageOptions"
        :reduce="(option) => option.id"
      />
    </div>
    <div class="mb-4" v-if="dataToPost.type === 'link'">
      <label class="font-weight-bolder" for="">
        Url
        <span class="text-danger">*</span>
      </label>
      <input
        v-model="dataToPost.url"
        class="form-control form-control-solid"
        type="text"
      />
    </div>
    <div class="mb-4">
      <label class="font-weight-bolder" for="">
        Icon
      </label>
      <UploadInput
        directory="data"
        name="Icon"
        :encrypt="true"
        :overwrite="false"
        v-model="dataToPost.icon"
        accept="image/*"
      />
      <img
        v-if="dataToPost.icon"
        class="img-fluid"
        :src="dataToPost.icon"
        style="max-height: 240px;"
        alt=""
      />
    </div>
    <div class="mt-8 text-center">
      <button @click="submit" type="submit" class="btn btn-sm btn-primary">
        <div v-if="!loading_submit">
          <span class="font-weight-bolder">
            <i class="fa fa-plus"></i>
            Insert page
          </span>
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
import SelectData from '@/components/SelectData.vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import axios from 'axios';
@Component({
  components: { SelectData, UploadInput },
  computed: {}
})
export default class AddItem extends Vue {
  @Prop(String) readonly selected_menu!: string;
  @Prop(String) readonly selected_page!: string;
  dataToPost = {
    page: null,
    type: 'page',
    name: null,
    url: null,
    icon: null
  };
  loading_fetch = false;
  loading_submit = false;
  pages = [];

  get pageOptions() {
    const options = this.pages.map((item: any) => {
      return {
        label: item.name,
        id: item.id
      };
    });
    return options;
  }

  async onModalShown() {
    try {
      this.loading_fetch = true;
      const { data } = await axios.get('page/get?limit=1000&page=1');
      this.pages = data.data.data;
      this.loading_fetch = false;
    } catch (error) {
      this.loading_fetch = false;
    }
  }

  reset() {
    this.dataToPost = {
      page: null,
      type: 'page',
      name: null,
      url: null,
      icon: null
    };
  }

  onSelectType() {
    this.dataToPost.page = null;
    this.dataToPost.url = null;
  }

  onModalHide() {
    this.reset();
    this.loading_fetch = false;
    this.loading_submit = false;
    this.pages = [];
    this.$emit('reset');
  }

  async submit() {
    try {
      this.loading_submit = true;
      await axios.post('menu/item/add', {
        page: this.dataToPost.page,
        type: this.dataToPost.type,
        name: this.dataToPost.name,
        url: this.dataToPost.url,
        icon: this.dataToPost.icon,
        menu_id: this.selected_menu,
        parent_id: this.selected_page
      });
      this.loading_submit = false;
      this.$root.$emit('bv::hide::modal', 'modal-add-page');
      this.$emit('refresh', this.selected_menu);
    } catch (error) {
      this.loading_submit = false;
    }
  }
}
</script>
