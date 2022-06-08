<template>
  <div>
    <Panel
      :title="selected_menu === '' ? 'Pilih menu' : 'Detail Menu'"
      :subtitle="
        selected_menu === ''
          ? 'Silakan memilih menu pada panel disamping kiri'
          : 'Anda dapat mengelola menu di bawah ini'
      "
    >
      <template v-slot:toolbar>
        <b-button
          variant="success"
          :disabled="selected_menu === ''"
          size="sm"
          v-b-modal.modal-add-page
        >
          <span class="d-flex align-items-center font-weight-bolder">
            <i class="fas fa-plus mb-0 mr-1"></i>
            Tambahkan halaman
          </span>
        </b-button>
      </template>

      <template v-slot:body>
        <div v-show="!fetchLoading" v-for="(item, index) in menus" :key="index">
          <menu-item-detail :menu="item" :level="0" :total="menus.length" />
        </div>
        <div class="text-center" v-show="fetchLoading">
          <span class="spinner spinner-success mr-10"></span>
          Loading...
        </div>
      </template>
    </Panel>
    <AddItem
      @refresh="fetchData"
      @reset="selected_menu_item = null"
      :selected_menu="selected_menu"
      :selected_menu_item="selected_menu_item"
    />
    <UpdateItem
      @refresh="fetchData"
      @reset="selected_menu_item = null"
      :selected_menu_item="selected_menu_item"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Panel from '../../../components/panel/Panel.vue';
import MenuItemDetail from './MenuItemDetail.vue';
import AddItem from './AddItem.vue';
import UpdateItem from './UpdateItem.vue';
import axios from 'axios';

@Component({
  components: { Panel, AddItem, UpdateItem, MenuItemDetail },
  computed: {}
})
export default class MenuDetail extends Vue {
  fetchLoading = false;
  fetchFailed = false;
  menus = [];
  selected_menu_item: string | null = null;

  @Prop(String) readonly selected_menu!: string;
  @Watch('selected_menu', { immediate: false, deep: false })
  async onPageSelected(val: string) {
    this.fetchLoading = true;
    await this.fetchData(val);
    this.fetchLoading = false;
  }

  mounted() {
    this.$root.$on('select-submenu', this.selectSubmenu);
    this.$root.$on('delete-submenu', this.deleteSubmenu);
    this.$root.$on('increase-submenu-order', this.increaseOrder);
    this.$root.$on('decrease-submenu-order', this.decreaseOrder);
  }

  selectSubmenu(id: string) {
    this.selected_menu_item = id;
  }

  async fetchData(val: string) {
    this.fetchLoading = true;
    this.fetchFailed = false;
    try {
      const { data } = await axios.get('menu/item/get/' + val);
      this.menus = data.data;
      this.fetchLoading = false;
    } catch (error) {
      this.fetchLoading = false;
      this.fetchFailed = false;
    }
  }

  async increaseOrder(id: string) {
    this.fetchLoading = true;
    await axios.put('/menu/item/increase-order/' + id);
    await this.fetchData(this.selected_menu);
  }

  async decreaseOrder(id: string) {
    this.fetchLoading = true;
    await axios.put('/menu/item/decrease-order/' + id);
    await this.fetchData(this.selected_menu);
  }

  async deleteSubmenu(id: string) {
    this.$swal({
      title: 'Apakah anda yakin ingin menghapus?',
      text: 'Anda tidak dapat mengembalikan aksi ini',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Saya mengerti',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.fetchLoading = true;
        await axios.delete('/menu/item/delete/' + id);
        this.fetchData(this.selected_menu);
      }
    });
  }
}
</script>
