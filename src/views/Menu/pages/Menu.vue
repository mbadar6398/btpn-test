<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <MenuList
          :selected_menu="this.selected_menu"
          @selectMenu="selectMenu"
        />
      </div>
      <div class="col-9">
        <MenuDetail :selected_menu="this.selected_menu" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '../../../components/panel/Panel.vue';
import MenuList from '../components/MenuList.vue';
import MenuDetail from '../components/MenuDetail.vue';

@Component({
  components: { Panel, MenuList, MenuDetail },
  computed: {}
})
export default class Menu extends Vue {
  selected_menu = '';
  selectMenu(id: string) {
    this.selected_menu = id;
  }
}
</script>
