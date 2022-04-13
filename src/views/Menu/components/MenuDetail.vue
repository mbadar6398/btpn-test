<template>
  <div>
    <Panel
      :title="selected_menu === '' ? 'Please select menu' : 'Menu Detail'"
      :subtitle="
        selected_menu === ''
          ? 'Please select menu on the left panel'
          : 'You can add, update, delete here'
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
            Add Page
          </span>
        </b-button>
      </template>

      <template v-slot:body>
        <table class="table" v-if="selected_menu !== ''">
          <thead class="bg-dark text-white">
            <tr>
              <th>Name</th>
              <th class="text-center" width="27%">Actions</th>
            </tr>
          </thead>
          <tbody v-if="!fetchLoading && !fetchFailed" class="py-4">
            <tr v-for="(item, index) in pages" :key="index">
              <td
                colspan="2"
                style="border: 0; padding-top: 0; padding-bottom: 0;"
              >
                <div class="d-flex flex-column">
                  <div
                    class="d-flex justify-content-between w-100 py-2"
                    style="border-bottom: solid 1px #eeeeee;"
                  >
                    <div>
                      <span class="font-size-lg">
                        {{ item.menu_item_name }}
                      </span>
                    </div>
                    <div class="text-center">
                      <button
                        v-b-tooltip.hover
                        title="Add submenu / page"
                        class="btn btn-transparent p-0 mr-4"
                        @click="addSubmenu(item.id)"
                        v-b-modal.modal-add-page
                      >
                        <i class="fa fa-plus text-primary"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        v-b-modal.modal-update-page
                        @click="selected_menu_item = item.id"
                        title="Update page"
                        class="btn btn-transparent p-0 mr-4"
                      >
                        <i class="fa fa-pencil-alt text-success"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Remove page from menu"
                        class="btn btn-transparent p-0 mr-4"
                        @click="deletePage(item.id)"
                      >
                        <i class="fa fa-trash-alt text-danger"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Move up"
                        class="btn btn-transparent p-0 mr-4"
                        :disabled="index === 0"
                        @click="increaseOrder(item.id)"
                      >
                        <i class="fa fa-arrow-up text-info"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Move down"
                        class="btn btn-transparent p-0"
                        :disabled="pages.length - 1 === index"
                        @click="decreaseOrder(item.id)"
                      >
                        <i class="fa fa-arrow-down text-info"></i>
                      </button>
                    </div>
                  </div>
                  <div
                    v-for="(item2, index2) in item['children']"
                    :key="index2"
                    class="d-flex justify-content-between w-100 py-2"
                    style="border-bottom: solid 1px #eeeeee;"
                  >
                    <div>
                      -----
                      <span class="font-size-lg">
                        {{ item2.menu_item_name }}
                      </span>
                    </div>
                    <div class="text-center">
                      <button
                        v-b-tooltip.hover
                        title="Page Detail"
                        class="btn btn-transparent p-0 mr-4"
                        v-b-modal.modal-update-page
                        @click="selected_menu_item = item2.id"
                      >
                        <i class="fa fa-pencil-alt text-success"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Remove page from menu"
                        class="btn btn-transparent p-0 mr-4"
                        @click="deletePage(item2.id)"
                      >
                        <i class="fa fa-trash-alt text-danger"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Move up"
                        class="btn btn-transparent p-0 mr-4"
                        :disabled="index2 === 0"
                        @click="increaseOrder(item2.id)"
                      >
                        <i class="fa fa-arrow-up text-info"></i>
                      </button>
                      <button
                        v-b-tooltip.hover
                        title="Move down"
                        class="btn btn-transparent p-0"
                        :disabled="item['children'].length - 1 === index2"
                        @click="decreaseOrder(item2.id)"
                      >
                        <i class="fa fa-arrow-down text-info"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="fetchFailed">
            <tr>
              <th colspan="2" class="text-center">
                <span>
                  Failed fetch data, Please
                  <span class="text-success cursor-pointer" @click="fetchData">
                    retry
                  </span>
                </span>
              </th>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th colspan="2" class="text-center">
                <span class="spinner spinner-success spinner-sm mr-8"></span>
                <span>Uploading...</span>
              </th>
            </tr>
          </tbody>
        </table>
        <p
          v-if="!fetchFailed && !fetchLoading && pages.length === 0"
          class="text-center"
        >
          Data is not found
        </p>
      </template>
    </Panel>
    <AddItem
      @refresh="fetchData"
      @reset="selected_page = null"
      :selected_menu="selected_menu"
      :selected_page="selected_page"
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
import AddItem from './AddItem.vue';
import UpdateItem from './UpdateItem.vue';
import axios from 'axios';

@Component({
  components: { Panel, AddItem, UpdateItem },
  computed: {}
})
export default class MenuDetail extends Vue {
  fetchLoading = false;
  fetchFailed = false;
  pages = [];
  selected_page: string | null = null;
  selected_menu_item: string | null = null;

  @Prop(String) readonly selected_menu!: string;
  @Watch('selected_menu', { immediate: false, deep: false })
  async onPageSelected(val: string) {
    this.fetchLoading = true;
    await this.fetchData(val);
    this.fetchLoading = false;
  }

  addSubmenu(id: string) {
    this.selected_page = id;
  }

  async fetchData(val: string) {
    this.fetchLoading = true;
    this.fetchFailed = false;
    try {
      const { data } = await axios.get('menu/item/get/' + val);
      this.pages = data.data;
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

  async deletePage(id: string) {
    this.$swal({
      title: 'Are you sure want to delete this page from menu?',
      text: 'Your action could not be reverted',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
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
