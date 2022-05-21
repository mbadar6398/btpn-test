<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <SectionList
          ref="SectionList"
          @select_section="select_section"
          :selected_section="selected_section"
          :pageId="pageId"
          :pageType="pageDetail.type"
        />
        <div class="card mt-8">
          <div class="card-header bg-dark text-white p-4">
            <span class="font-weight-bolder">Setting Halaman</span>
          </div>
          <div class="card-body p-4">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <form
                refs="updateForm"
                novalidate
                @submit.prevent="handleSubmit(updatePage)"
              >
                <ValidationProvider
                  v-slot="{ errors, classes }"
                  name="Nama halaman"
                  rules="required"
                >
                  <div class="form-group">
                    <label
                      :class="errors[0] && 'text-danger'"
                      class="font-weight-bolder"
                      for=""
                    >
                      <span class="text-danger mr-1">*</span>
                      Nama halaman
                    </label>
                    <input
                      :class="classes"
                      v-model="pageDetail.name"
                      class="form-control form-control-solid"
                      type="text"
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors, classes }"
                  name="Slug"
                  rules="required"
                >
                  <div class="form-group">
                    <label
                      :class="errors[0] && 'text-danger'"
                      class="font-weight-bolder"
                      for=""
                    >
                      <span class="text-danger mr-1">*</span>
                      Slug
                    </label>
                    <input
                      :class="classes"
                      v-model="pageDetail.slug"
                      class="form-control form-control-solid"
                      type="text"
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-if="pageDetail.type === 'Template'"
                  v-slot="{ errors, classes }"
                  name="Nama template"
                  rules="required"
                >
                  <div class="form-group">
                    <label
                      :class="errors[0] && 'text-danger'"
                      class="font-weight-bolder"
                      for=""
                    >
                      <span class="text-danger mr-1">*</span>
                      Nama template
                    </label>
                    <input
                      :class="classes"
                      v-model="pageDetail.template"
                      class="form-control form-control-solid"
                      type="text"
                    />
                  </div>
                </ValidationProvider>
                <div class="form-group">
                  <label class="font-weight-bolder" for="">Title tag</label>
                  <input
                    v-model="pageDetail.title_tag"
                    class="form-control form-control-solid"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <label class="font-weight-bolder" for="">
                    Meta description
                  </label>
                  <input
                    v-model="pageDetail.meta_description"
                    class="form-control form-control-solid"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <label class="font-weight-bolder" for="">Meta keywords</label>
                  <input
                    v-model="pageDetail.meta_keywords"
                    class="form-control form-control-solid"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <label class="font-weight-bolder" for="">Status</label>
                  <select
                    class="form-control form-control-solid"
                    v-model="pageDetail.visibility"
                    name=""
                    id=""
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
                <button
                  :disabled="updateLoading"
                  class="btn btn-success btn-block btn-sm font-weight-bolder"
                >
                  <div v-if="!updateLoading">
                    <i class="fa fa-save"></i>
                    Simpan Perubahan
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
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
      <div class="col-9">
        <SectionInformation
          @refresh="getSections"
          @select_section="select_section(null)"
          :pageId="pageId"
          :selected_section="selected_section"
          :pageType="pageDetail.type"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionList from '../components/SectionList.vue';
import Panel from '@/components/panel/Panel.vue';
import SectionInformation from '../components/SectionInformation.vue';
import axios from 'axios';
@Component({
  components: { SectionList, Panel, SectionInformation },
  computed: {}
})
export default class PagesDetail extends Vue {
  selected_section: string | null = '';
  pageDetail: any = {};
  updateLoading = false;
  get pageId() {
    return this.$route.params.id;
  }

  select_section(id: string | null) {
    this.selected_section = id;
  }

  async updatePage() {
    try {
      this.updateLoading = true;
      await axios.put('/page/update/' + this.pageId, this.pageDetail);
      this.updateLoading = false;
    } catch (error) {
      this.updateLoading = false;
    }
  }

  async mounted() {
    const pageDetail = await axios.get('page/detail/' + this.pageId);
    this.pageDetail = pageDetail.data.data;
  }

  getSections() {
    const component = this.$refs.SectionList as any;
    component.getSections();
  }
}
</script>
