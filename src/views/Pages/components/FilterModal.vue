<template>
  <b-modal id="modal-filter" hide-footer title="Filter halaman">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Nama halaman</label>
      <input
        v-model="filter.name"
        class="form-control form-control-solid"
        type="text"
      />
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Jenis</label>
      <select v-model="filter.type" class="form-control form-control-solid">
        <option value="">Pilih semua</option>
        <option value="Template">Template</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Status</label>
      <select
        v-model="filter.visibility"
        class="form-control form-control-solid"
      >
        <option value="">Pilih semua</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Hidden">Hidden</option>
      </select>
    </div>
    <div class="form-group d-flex justify-content-center mb-0">
      <button
        @click="resetFilter"
        class="btn btn-danger btn-sm font-weight-bolder mr-4"
      >
        <i class="la la-close"></i>
        Atur ulang
      </button>
      <button @click="submit" class="btn btn-sm btn-primary font-weight-bolder">
        <i class="fa fa-filter"></i>
        Filter data
      </button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {}
})
export default class FilterModel extends Vue {
  loading = false;
  filter = {
    name: '',
    type: '',
    visibility: ''
  };

  resetFilter() {
    this.filter = {
      name: '',
      type: '',
      visibility: ''
    };
    this.$emit('filter', this.filter);
    this.$root.$emit('bv::hide::modal', 'modal-filter');
  }

  submit() {
    this.$emit('filter', this.filter);
    this.$root.$emit('bv::hide::modal', 'modal-filter');
  }
}
</script>
