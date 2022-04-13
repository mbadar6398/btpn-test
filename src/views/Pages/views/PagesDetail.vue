<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <SectionList
          ref="SectionList"
          @select_section="select_section"
          :selected_section="selected_section"
          :pageId="pageId"
        />
      </div>
      <div class="col-9">
        <SectionInformation
          @refresh="getSections"
          @select_section="select_section(null)"
          :pageId="pageId"
          :selected_section="selected_section"
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
@Component({
  components: { SectionList, Panel, SectionInformation },
  computed: {}
})
export default class PagesDetail extends Vue {
  selected_section: string | null = '';
  get pageId() {
    return this.$route.params.id;
  }

  select_section(id: string | null) {
    this.selected_section = id;
  }

  getSections() {
    const component = this.$refs.SectionList as any;
    component.getSections();
  }
}
</script>
