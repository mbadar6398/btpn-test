<template>
  <div class="list-group">
    <div
      class="list-group-item list-group-item-action active d-flex align-items-center justify-content-between"
      aria-current="true"
      disabled
      style="font-weight: bolder;"
    >
      <span>Section List</span>
      <span v-if="fetchLoading" class="spinner spinner-success mr-5"></span>
      <span
        v-b-modal.modal-create-section
        class="cursor-pointer"
        v-if="!fetchLoading"
      >
        <i class="fa fa-plus text-success"></i>
      </span>
    </div>
    <button
      v-for="(item, index) in sections"
      :key="index"
      type="button"
      @click="selectSection(item.id)"
      class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
      :class="selected_section === item.id ? 'bg-darken' : ''"
    >
      <span>{{ item.name }}</span>
    </button>
    <div v-if="fetchFailed" class="list-group-item d-flex align-items-center">
      Failed, Please
      <span
        @click="getSections"
        class="text-danger cursor-pointer ml-1 font-weight-bolder"
      >
        retry
      </span>
    </div>
    <CreateSectionModal @refresh="getSections" :page_id="pageId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';
import CreateSectionModal from './CreateSection.vue';

@Component({
  components: { CreateSectionModal },
  computed: {}
})
export default class SectionList extends Vue {
  @Prop(String) readonly pageId!: string;
  @Prop(String) readonly selected_section!: string;
  fetchLoading = false;
  fetchFailed = false;
  sections: any[] = [];

  async mounted() {
    await this.getSections();
    this.selectSection(this.sections[0]['id']);
  }

  async getSections() {
    try {
      this.fetchFailed = false;
      this.fetchLoading = true;
      const sections = await axios.get('sections/list/' + this.pageId);
      this.sections = sections.data.data;
      this.fetchLoading = false;
    } catch (error) {
      this.fetchFailed = true;
      this.fetchLoading = false;
      this.sections = [];
    }
  }

  selectSection(id: string) {
    this.$emit('select_section', id);
  }
}
</script>
