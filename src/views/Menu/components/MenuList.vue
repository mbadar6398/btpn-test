<template>
  <div class="list-group">
    <div
      class="list-group-item list-group-item-action active d-flex align-items-center justify-content-between"
      aria-current="true"
      disabled
      style="font-weight: bolder;"
    >
      <span>Daftar Menu</span>
      <span v-if="fetchLoading" class="spinner spinner-success mr-5"></span>
    </div>
    <button
      v-for="item in menu"
      :key="item.id"
      type="button"
      @click="selectMenu(item.id)"
      :class="selected_menu === item.id && 'bg-darken'"
      class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
    >
      <span>{{ item.name }}</span>
      <span
        v-b-tooltip.hover
        title="Public"
        v-if="item.visibility === 'Public'"
        class="text-success font-weight-bolder ml-auto"
      >
        <i class="fa fa-eye font-size-sm text-primary"></i>
      </span>
      <span
        v-b-tooltip.hover
        title="Private"
        v-else
        class="text-primary font-weight-bolder ml-auto"
      >
        <i class="fa fa-eye-slash font-size-sm text-success"></i>
      </span>
    </button>
    <div v-if="fetchFailed" class="list-group-item d-flex align-items-center">
      Failed, Please
      <span
        @click="fetchData"
        class="text-danger cursor-pointer ml-1 font-weight-bolder"
      >
        retry
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';
@Component({
  components: {},
  computed: {}
})
export default class MenuList extends Vue {
  @Prop(String) readonly selected_menu!: string;
  menu = [];
  fetchLoading = false;
  fetchFailed = false;
  selectMenu(id: string) {
    this.$emit('selectMenu', id);
  }

  mounted() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.fetchLoading = true;
      this.fetchFailed = false;
      const { data } = await axios.get('menu/get');
      this.selectMenu(data.data[0].id);
      this.menu = data.data;
      this.fetchLoading = false;
    } catch (error) {
      this.fetchLoading = false;
      this.fetchFailed = true;
    }
  }
}
</script>
