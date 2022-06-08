<template>
  <b-modal
    id="modal-update-page"
    hide-footer
    title="Update item"
    @shown="onModalShown"
    @hide="onModalHide"
  >
    <div v-if="!loading_fetch">
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
          <option value="no-action">No Action</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="font-weight-bolder" for="">
          Name (ID)
          <span class="text-danger">*</span>
        </label>
        <input
          v-model="dataToPost.name"
          class="form-control form-control-solid"
          type="text"
        />
      </div>
      <div class="mb-4">
        <label class="font-weight-bolder" for="">
          Name (EN)
          <span class="text-danger">*</span>
        </label>
        <input
          v-model="dataToPost.name_en"
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
        <button @click="submit" class="btn btn-sm btn-success">
          <div v-if="!loading_submit">
            <span class="font-weight-bolder">
              <i class="fa fa-save"></i>
              Save changes
            </span>
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
import SelectData from '@/components/SelectData.vue';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import MainConfig from '@/config/config';
import axios from 'axios';
@Component({
  components: { SelectData, UploadInput },
  computed: {}
})
export default class UpdateItem extends Vue {
  @Prop(String) readonly selected_menu_item!: string;
  dataToPost = {
    page: null,
    type: 'page',
    name: null,
    name_en: null,
    url: null,
    icon: null,
    page_slug: null
  };
  menu_id = '';
  loading_fetch = true;
  loading_submit = false;
  pages: any[] = [];

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
      const pagesData = await axios.get('page/get?limit=1000&page=1');
      const pageData = await axios.get(
        'menu/item/detail/' + this.selected_menu_item
      );
      this.dataToPost.page = pageData.data.data.page_id;
      this.dataToPost.type = pageData.data.data.menu_item_type;
      this.dataToPost.name = pageData.data.data.menu_item_name;
      this.dataToPost.name_en = pageData.data.data.menu_item_name_en;
      this.dataToPost.url = pageData.data.data.menu_item_url;
      this.dataToPost.icon = pageData.data.data.menu_item_icon;
      this.dataToPost.page_slug = pageData.data.data.page_slug;
      this.menu_id = pageData.data.data.menu_id;
      this.pages = pagesData.data.data.data;
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
      name_en: null,
      url: null,
      icon: null,
      page_slug: null
    };
  }
  onModalHide() {
    this.reset();
    this.loading_fetch = false;
    this.loading_submit = false;
    this.pages = [];
  }

  onSelectType() {
    this.dataToPost.page = null;
    this.dataToPost.url = null;
  }

  get selected_page(): any {
    return this.pages.find((item: any) => item.id === this.dataToPost.page);
  }

  get website_url() {
    return MainConfig.website_url;
  }

  async submit() {
    try {
      this.loading_submit = true;
      if (this.dataToPost.type === 'page') {
        this.dataToPost.url = this.website_url + this.selected_page.slug;
      }
      console.log(this.dataToPost);
      await axios.put('menu/item/update/' + this.selected_menu_item, {
        page: this.dataToPost.page,
        type: this.dataToPost.type,
        name: this.dataToPost.name,
        name_en: this.dataToPost.name_en,
        url: this.dataToPost.url,
        icon: this.dataToPost.icon
      });
      this.loading_submit = false;
      this.$root.$emit('bv::hide::modal', 'modal-update-page');
      this.$emit('refresh', this.menu_id);
    } catch (error) {
      this.loading_submit = false;
    }
  }
}
</script>
