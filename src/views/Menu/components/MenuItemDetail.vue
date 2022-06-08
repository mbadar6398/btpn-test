<template>
  <div>
    <div
      class="d-flex justify-content-between"
      style="border-bottom: solid 1px #cccccc; padding: 1rem 1rem; background: #f5f5f5;"
    >
      <div class="font-weight-bolder">
        <span v-for="(dash, index) in level" :key="index">---</span>
        {{ menu.menu_item_name }}
      </div>
      <div class="text-center">
        <button
          @click="selectSubmenu(menu.id)"
          v-b-tooltip.hover
          title="Tambahkan sub halaman"
          class="btn btn-transparent p-0 mr-4"
          v-b-modal.modal-add-page
        >
          <i class="fa fa-plus text-primary"></i>
        </button>
        <button
          @click="selectSubmenu(menu.id)"
          v-b-tooltip.hover
          v-b-modal.modal-update-page
          title="Update halaman"
          class="btn btn-transparent p-0 mr-4"
        >
          <i class="fa fa-pencil-alt text-success"></i>
        </button>
        <button
          @click="deleteSubmenu(menu.id)"
          v-b-tooltip.hover
          title="Hapus halaman dari menu"
          class="btn btn-transparent p-0 mr-4"
        >
          <i class="fa fa-trash-alt text-danger"></i>
        </button>
        <button
          :disabled="Number(menu.menu_item_order_seq) === 1"
          @click="increaseOrder(menu.id)"
          v-b-tooltip.hover
          title="Pindahkan keatas"
          class="btn btn-transparent p-0 mr-4"
        >
          <i class="fa fa-arrow-up text-info"></i>
        </button>
        <button
          :disabled="total === Number(menu.menu_item_order_seq)"
          @click="decreaseOrder(menu.id)"
          v-b-tooltip.hover
          title="Pindahkan kebawah"
          class="btn btn-transparent p-0"
        >
          <i class="fa fa-arrow-down text-info"></i>
        </button>
      </div>
    </div>
    <div v-if="menu.children.length > 0">
      <menu-item-detail
        v-for="(item, index) in menu.children"
        :key="index"
        :menu="item"
        :level="level + 1"
        :total="menu.children.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {}
})
export default class MenuItemDetail extends Vue {
  @Prop(Object) readonly menu!: object;
  @Prop(Number) readonly level!: number;
  @Prop(Number) readonly total!: number;

  selectSubmenu(id: string) {
    this.$root.$emit('select-submenu', id);
  }
  deleteSubmenu(id: string) {
    this.$root.$emit('delete-submenu', id);
  }
  increaseOrder(id: string) {
    this.$root.$emit('increase-submenu-order', id);
  }
  decreaseOrder(id: string) {
    this.$root.$emit('decrease-submenu-order', id);
  }
}
</script>
